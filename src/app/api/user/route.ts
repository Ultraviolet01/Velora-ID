import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { evmAddress: address },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { evmAddress: address },
      update: {},
      create: {
        evmAddress: address,
        trustScore: 78, // Initial mock score for demo
        riskTier: "low",
        onboardingStep: 6,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to upsert user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
