import { NextResponse } from "next/server";
import { loanService } from "@/services/loan";

export async function POST(req: Request) {
  try {
    const { userId, fundingId, amount, txHash } = await req.json();

    if (!userId || !fundingId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const repayment = await loanService.recordRepayment(
      userId,
      fundingId,
      amount,
      txHash
    );

    return NextResponse.json(repayment);
  } catch (error) {
    console.error("Failed to record repayment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
