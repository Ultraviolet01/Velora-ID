import { NextResponse } from "next/server";
import { loanService } from "@/services/loan";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const funding = await loanService.getActiveFunding(userId);

    if (!funding) {
      return NextResponse.json({ error: "No active funding found" }, { status: 404 });
    }

    return NextResponse.json(funding);
  } catch (error) {
    console.error("Failed to fetch active funding:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
