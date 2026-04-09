"use client";

import Link from "next/link";
import {
  TrendingUp,
  Shield,
  Users,
  Building,
  Coins,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { getDefaultDemoScenario } from "@/data/demo";
import { eligibilityService } from "@/services/eligibility";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { address } = useAccount();
  const [userData, setUserData] = useState<any>(null);
  const [kycInfo, setKycInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const demoScenario = getDefaultDemoScenario();

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch profile from DB
        const profileRes = await fetch(`/api/user/profile?address=${address}`);
        if (profileRes.ok) {
          const data = await profileRes.json();
          setUserData(data);
        }

        // Fetch real-time KYC status from HashKey Chain
        const { hashKeyKycService } = await import("@/services/hashkey-kyc");
        const info = await hashKeyKycService.getKycInfo(address as `0x${string}`);
        if (info) {
          setKycInfo(info);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Final reputation logic - Real data first, fallback to demo if no record found
  const trustScore = userData?.trustScore ?? demoScenario.eligibility.trustScore;
  const riskTier = userData?.riskTier ?? demoScenario.eligibility.riskTier;
  const displayName = userData?.displayName ?? "Anonymous User";
  
  // For the product limits, we use the eligibility service logic locally based on the fetched score
  const eligibility = eligibilityService.calculateEligibility(
    {
      nexaIdVerified: userData?.nexaIdVerified ?? false,
      kycLevel: kycInfo?.level,
      kycStatus: kycInfo?.status,
      nativeStats: { walletAgeDays: 120, transactionCount: 45, activityMonths: 4 },
      crossChainStats: userData?.reputationHistory?.[0]?.snapshot || undefined,
      fieldsCompleted: 5,
      totalFields: 5,
      onTimePayments: 0,
      totalPayments: 0,
      monthlyInflow: 5000,
      monthlySales: 10000,
    },
    userData?.profileType || "creator",
    {}
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Your financial eligibility overview and trust profile.
        </p>
      </div>

      {/* Trust Score Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="gradient" glow className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Trust Score</CardTitle>
              <Badge variant={eligibility.riskTier === "low" ? "success" : "warning"}>
                {eligibility.riskTier.toUpperCase()} RISK
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4 mb-6">
              <span className="text-6xl font-bold text-primary">
                {eligibility.trustScore}
              </span>
              <span className="text-2xl text-muted-foreground mb-2">/100</span>
            </div>
            <Progress value={eligibility.trustScore} className="h-3 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-muted-foreground">Badge</p>
                <Badge variant="gold" className="mt-1">Gold Trust</Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Identity</p>
                <p className="font-semibold">{kycInfo?.isApproved ? (kycInfo.level >= 2 ? "Advanced" : "Basic") : "Unverified"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-semibold text-green-500">Eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              HashKey KYC Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-2 w-2 rounded-full",
                kycInfo?.isApproved ? "bg-green-500" : "bg-yellow-500"
              )} />
              <div>
                <p className="font-medium">
                  {kycInfo?.isApproved ? "Identity Approved" : "Verification Pending"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {kycInfo?.isApproved ? `Level ${kycInfo.level} Soul Bound Token` : "Verify on HashFans to enable limits"}
                </p>
              </div>
            </div>
            
            {kycInfo?.ensName && (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">ENS Name Linked</p>
                  <p className="text-xs text-muted-foreground">{kycInfo.ensName}.hsk</p>
                </div>
              </div>
            )}

            {!kycInfo?.isApproved && (
              <a href="https://hashfans.io" target="_blank" rel="noopener noreferrer">
                <Button variant="gradient" size="sm" className="w-full mt-4">
                  Verify Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            )}
            
            <Link href="/proof-vault">
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                View Proof Vault
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Product Eligibility Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Eligibility</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card variant="glass" className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-purple-500" />
                <Badge variant="verified">Eligible</Badge>
              </div>
              <CardTitle>Creator Advance</CardTitle>
              <CardDescription>
                Cash advances based on your creator income
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Available Limit</p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(eligibility.creatorAdvanceLimit)}
                </p>
              </div>
              <Link href="/creator">
                <Button className="w-full group-hover:bg-primary">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card variant="glass" className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Building className="h-8 w-8 text-blue-500" />
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Setup Required
                </Badge>
              </div>
              <CardTitle>Merchant PayFi</CardTitle>
              <CardDescription>
                Working capital for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Potential Limit</p>
                <p className="text-3xl font-bold text-muted-foreground">
                  {formatCurrency(135000)}
                </p>
              </div>
              <Link href="/merchant">
                <Button variant="outline" className="w-full">
                  Complete Setup
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card variant="glass" className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Coins className="h-8 w-8 text-green-500" />
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Setup Required
                </Badge>
              </div>
              <CardTitle>DeFi Credit</CardTitle>
              <CardDescription>
                Under-collateralized DeFi borrowing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Potential Limit</p>
                <p className="text-3xl font-bold text-muted-foreground">
                  {formatCurrency(40000)}
                </p>
              </div>
              <Link href="/defi">
                <Button variant="outline" className="w-full">
                  Complete Setup
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Score Factors */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>
            Factors contributing to your trust score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eligibility.factors.map((factor, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{factor.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {factor.score}/{factor.maxScore}
                  </span>
                </div>
                <Progress
                  value={(factor.score / factor.maxScore) * 100}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            AI Recommendations
          </CardTitle>
          <CardDescription>
            How to improve your trust score and eligibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {eligibility.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">{rec}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
