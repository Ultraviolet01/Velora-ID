import { NextResponse } from "next/server";
import { loanService } from "@/services/loan";

export async function POST(req: Request) {
  try {
    const { userId, type, amount } = await req.json();

    if (!userId || !type || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = await loanService.createApplication(userId, type, amount);
    return NextResponse.json(application);
  } catch (error) {
    console.error("Failed to create application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await loanService.getApplications();
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
