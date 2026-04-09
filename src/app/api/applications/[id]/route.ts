import { NextResponse } from "next/server";
import { loanService } from "@/services/loan";
import { aiExplanationService } from "@/services/ai-explanation";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const applicationId = params.id;
    const { status, applicantId, profileType, eligibility, requestedAmount } = await req.json();

    if (!applicationId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let aiReview = null;
    if (status === "approved" || status === "rejected") {
      // Generate real AI risk report if we are moving to a decision
      aiReview = await aiExplanationService.generateInstitutionalRiskReport(
        applicantId,
        profileType,
        eligibility,
        requestedAmount
      );
    }

    const application = await loanService.processApplication(
      applicationId,
      status,
      aiReview
    );

    return NextResponse.json(application);
  } catch (error) {
    console.error("Failed to update application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
