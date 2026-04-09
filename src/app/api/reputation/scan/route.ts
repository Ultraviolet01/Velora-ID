import { NextResponse } from "next/server";
import { eligibilityService } from "@/services/eligibility";
import prisma from "@/lib/prisma";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

export async function POST(req: Request) {
  try {
    const { evmAddress, solanaAddress, profileType, profileData } = await req.json();

    if (!evmAddress) {
      return NextResponse.json({ error: "EVM Address is required" }, { status: 400 });
    }

    if (!MORALIS_API_KEY) {
      console.error("MORALIS_API_KEY is not configured on the server.");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // 1. Fetch Multi-chain stats from Moralis (Server-side)
    const stats = await fetchMultiChainActivity(evmAddress, solanaAddress);

    // 2. Calculate Eligibility using the service
    const result = eligibilityService.calculateEligibility(
      {
        nexaIdVerified: true, // Mocked for now in sync with frontend
        nativeStats: {
          walletAgeDays: 120,
          transactionCount: 45,
          activityMonths: 4,
        },
        crossChainStats: stats,
        fieldsCompleted: 5,
        totalFields: 5,
        onTimePayments: 0,
        totalPayments: 0,
        monthlyInflow: profileData?.monthlyInflow || 5000,
        monthlySales: profileData?.monthlySales || 10000,
      },
      profileType || "creator",
      {}
    );

    // 3. Persist / Update User in Database
    const user = await prisma.user.upsert({
      where: { evmAddress },
      update: {
        solanaAddress,
        displayName: profileData?.displayName || undefined,
        trustScore: result.trustScore,
        riskTier: result.riskTier,
        onboardingStep: 6,
      },
      create: {
        evmAddress,
        solanaAddress,
        displayName: profileData?.displayName || "Anonymous",
        trustScore: result.trustScore,
        riskTier: result.riskTier,
        onboardingStep: 6,
        evmVerified: true,
      },
    });

    // 4. Save Reputation History
    await prisma.reputationHistory.create({
      data: {
        userId: user.id,
        trustScore: result.trustScore,
        riskTier: result.riskTier,
        snapshot: stats as any,
      },
    });

    return NextResponse.json({ result, stats });
  } catch (error) {
    console.error("Reputation scan error:", error);
    return NextResponse.json({ error: "Failed to scan reputation" }, { status: 500 });
  }
}

async function fetchMultiChainActivity(evmAddress: string, solanaAddress?: string) {
  const evmChains = [
    { id: "0x1", name: "ethereum" },
    { id: "0x2105", name: "base" },
    { id: "0xa4b1", name: "arbitrum" },
    { id: "0x38", name: "bsc" },
  ];

  const evmPromises = evmChains.map((chain) => fetchEvmChainStats(evmAddress, chain.id));
  const evmResults = await Promise.all(evmPromises);

  let solanaStats;
  if (solanaAddress) {
    solanaStats = await fetchSolanaStats(solanaAddress);
  }

  const totalTransactions = evmResults.reduce((sum, res) => sum + res.transactions, 0) + (solanaStats?.transactions || 0);
  const activeChainsCount = evmResults.filter(r => r.active).length + (solanaStats?.active ? 1 : 0);
  
  const allDates = [...evmResults.map(r => r.firstSeen), solanaStats?.firstSeen].filter(Boolean) as string[];
  const earliestActivity = allDates.length > 0 ? new Date(Math.min(...allDates.map(d => new Date(d).getTime()))).toISOString() : null;

  return {
    evm: {
      address: evmAddress,
      chains: evmResults,
      totalTransactions: evmResults.reduce((sum, res) => sum + res.transactions, 0),
    },
    solana: solanaStats,
    overall: {
      totalTxCount: totalTransactions,
      activeChainsCount,
      earliestActivity,
    },
  };
}

async function fetchEvmChainStats(address: string, chainId: string) {
  try {
    const balanceRes = await fetch(
      `https://deep-index.moralis.io/api/v2.2/wallets/${address}/balance?chain=${chainId}`,
      { headers: { "X-API-Key": MORALIS_API_KEY! } }
    );
    const balanceData = await balanceRes.json();

    const historyRes = await fetch(
      `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=${chainId}&limit=1`,
      { headers: { "X-API-Key": MORALIS_API_KEY! } }
    );
    const historyData = await historyRes.json();

    return {
      chain: chainId,
      transactions: historyData.total || 0,
      balance: balanceData.balance || "0",
      active: (historyData.total || 0) > 0,
      firstSeen: historyData.result?.[0]?.block_timestamp,
    };
  } catch (e) {
    return { chain: chainId, transactions: 0, balance: "0", active: false };
  }
}

async function fetchSolanaStats(address: string) {
  try {
    const res = await fetch(
      `https://solana-gateway.moralis.io/account/mainnet/${address}/balance`,
      { headers: { "X-API-Key": MORALIS_API_KEY! } }
    );
    const data = await res.json();
    
    const txRes = await fetch(
      `https://solana-gateway.moralis.io/account/mainnet/${address}/transactions`,
      { headers: { "X-API-Key": MORALIS_API_KEY! } }
    );
    const txData = await txRes.json();

    return {
      address,
      transactions: txData.length || 0,
      balance: data.solana || "0",
      active: (txData.length || 0) > 0,
      firstSeen: txData[txData.length - 1]?.block_timestamp,
    };
  } catch (e) {
    return { address, transactions: 0, balance: "0", active: false };
  }
}
