import { NextResponse } from "next/server";
import { verifyMessage } from "viem";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { address, message, signature, solanaAddress } = await req.json();

    if (!address || !message || !signature) {
      return NextResponse.json({ error: "Missing verification data" }, { status: 400 });
    }

    // 1. Verify EVM Signature
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Persist or Update User Profile
    const user = await prisma.user.upsert({
      where: { evmAddress: address },
      update: {
        evmVerified: true,
        solanaAddress: solanaAddress || undefined,
        onboardingStep: 2,
      },
      create: {
        evmAddress: address,
        evmVerified: true,
        solanaAddress: solanaAddress || undefined,
        onboardingStep: 2,
        trustScore: 0,
        riskTier: "high",
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
