import prisma from "@/lib/prisma";
import { ApplicationStatus, ProfileType } from "@/types";
import { eligibilityService } from "./eligibility";

export class LoanService {
  async createApplication(userId: string, type: string, amount: number) {
    // Get latest eligibility for snapshot
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { reputationHistory: { orderBy: { createdAt: "desc" }, take: 1 } }
    });

    const eligibilitySnapshot = user?.reputationHistory[0]?.snapshot || {};

    return await prisma.application.create({
      data: {
        userId,
        type,
        amount,
        status: "pending",
        eligibilitySnapshot,
      },
    });
  }

  async getApplications() {
    return await prisma.application.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async processApplication(applicationId: string, status: string, aiReview: any) {
    const application = await prisma.application.update({
      where: { id: applicationId },
      data: { status, aiReview },
    });

    if (status === "approved") {
      // Create funding/loan record
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 90); // 90 days default

      await prisma.funding.create({
        data: {
          applicationId,
          userId: application.userId,
          principal: application.amount,
          remainingBalance: application.amount,
          status: "active",
          dueDate,
        },
      });
    }

    return application;
  }

  async getActiveFunding(userId: string) {
    return await prisma.funding.findFirst({
      where: { userId, status: "active" },
      include: { repayments: true },
    });
  }

  async recordRepayment(userId: string, fundingId: string, amount: number, txHash?: string) {
    return await prisma.$transaction(async (tx) => {
      const repayment = await tx.repayment.create({
        data: {
          fundingId,
          userId,
          amount,
          status: "success",
          txHash,
        },
      });

      const funding = await tx.funding.update({
        where: { id: fundingId },
        data: {
          remainingBalance: {
            decrement: amount,
          },
        },
      });

      if (funding.remainingBalance <= 0) {
        await tx.funding.update({
          where: { id: fundingId },
          data: { status: "repaid" },
        });
      }

      return repayment;
    });
  }
}

export const loanService = new LoanService();
