"use client";

import {
  TrendingUp,
  Coins,
  Shield,
  Percent,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Wallet,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { getDemoScenario } from "@/data/demo";

export default function DefiPage() {
  const scenario = getDemoScenario("approved-defi")!;
  const { eligibility, profile } = scenario;
  const profileData = profile.profileData as {
    preferredBorrowRange: { min: number; max: number };
    riskTolerance: string;
    collateralTypes: string[];
  };

  const [showExplanation, setShowExplanation] = useState(false);

  const creditLimit = eligibility.defiBorrowLimit;
  const suggestedBorrow = Math.round(creditLimit * 0.5);
  const interestRate = 12;
  const poolAccess = eligibility.trustScore >= 80 ? "premium" : "standard";
  const collateralFlexibility = eligibility.trustScore >= 75 ? "enhanced" : "standard";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">DeFi Credit Access</h1>
          <p className="text-muted-foreground">
            Under-collateralized borrowing powered by verified trust signals.
          </p>
        </div>
        <Badge variant="platinum" className="w-fit">
          Platinum Trust • {eligibility.trustScore}/100
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Credit Tier</span>
            </div>
            <Badge variant="platinum" className="text-lg px-3 py-1">
              Platinum
            </Badge>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Percent className="h-4 w-4" />
              <span className="text-sm">Interest Rate</span>
            </div>
            <p className="text-2xl font-bold">{interestRate}% APR</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Collateral</span>
            </div>
            <p className="text-2xl font-bold capitalize">{collateralFlexibility}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pool Access & Trust Verification */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Pool Access Status</CardTitle>
            <CardDescription>Your DeFi protocol eligibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Premium Pools</p>
                  <p className="text-xs text-muted-foreground">Lower rates, higher limits</p>
                </div>
              </div>
              <Badge variant="success">Unlocked</Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Standard Pools</p>
                  <p className="text-xs text-muted-foreground">Base-rate borrowing</p>
                </div>
              </div>
              <Badge variant="success">Unlocked</Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Institutional Pools</p>
                  <p className="text-xs text-muted-foreground">95+ trust score required</p>
                </div>
              </div>
              <Badge variant="outline">Locked</Badge>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Trust Verification</CardTitle>
            <CardDescription>Proofs powering your credit access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Identity Verified</p>
                <p className="text-xs text-muted-foreground">Nexa ID ZK proof</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Wallet Ownership</p>
                <p className="text-xs text-muted-foreground">600+ days of activity</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">DeFi Experience</p>
                <p className="text-xs text-muted-foreground">Previous protocol interactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Repayment History</p>
                <p className="text-xs text-muted-foreground">Positive track record</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Simulation */}
      <Card variant="gradient" glow>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Credit Simulation</CardTitle>
            <Badge variant="verified">Premium Access</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Credit Limit</p>
              <p className="text-5xl font-bold text-primary mb-4">
                {formatCurrency(creditLimit)}
              </p>
              <p className="text-sm text-muted-foreground">
                Based on Platinum Trust status ({eligibility.trustScore}/100)
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50">
                <p className="text-sm font-medium mb-3">Borrow Simulation</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Requested Amount</span>
                    <span className="font-semibold">{formatCurrency(suggestedBorrow)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Approved Amount</span>
                    <span className="font-semibold text-green-500">
                      {formatCurrency(suggestedBorrow)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold">{interestRate}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Collateral Required</span>
                    <span className="font-semibold">60% LTV</span>
                  </div>
                  <hr className="my-3 border-border" />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Monthly Interest</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(Math.round((suggestedBorrow * interestRate) / 100 / 12))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gradient" size="lg" className="flex-1">
              Initiate Borrow
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              Adjust Amount
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collateral Types */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Accepted Collateral</CardTitle>
          <CardDescription>Asset types eligible for collateral</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["ETH", "WBTC", "USDC", "USDT", "DAI", "LINK", "UNI", "AAVE"].map((token) => (
              <div
                key={token}
                className="p-4 rounded-lg bg-background/50 text-center hover:bg-primary/5 transition-colors"
              >
                <Wallet className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-medium">{token}</p>
                <p className="text-xs text-muted-foreground">
                  {token === "USDC" || token === "USDT" || token === "DAI" ? "65% LTV" : "60% LTV"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Explanation */}
      <Card variant="glass">
        <CardHeader>
          <button
            className="flex items-center justify-between w-full"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Confidence Explanation</CardTitle>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${showExplanation ? "rotate-180" : ""}`}
            />
          </button>
        </CardHeader>
        {showExplanation && (
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm">
                You qualify for{" "}
                <span className="font-bold text-green-400">{formatCurrency(creditLimit)}</span>{" "}
                DeFi credit with premium pool access and enhanced collateral flexibility based on
                your Platinum Trust status ({eligibility.trustScore}/100).
              </p>
            </div>

            <div>
              <p className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Trust Factors
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Strong on-chain reputation with 600+ days of activity</li>
                <li>• Verified wallet ownership through Nexa ID</li>
                <li>• Consistent DeFi protocol interaction history</li>
                <li>• Positive repayment track record</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium text-primary mb-2">💡 Unlock More</p>
              <p className="text-sm text-muted-foreground">
                Reach 95+ trust score to unlock Institutional Pools with rates as low as 6% APR
                and 75% LTV.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Protocol Readiness */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Protocol Readiness</CardTitle>
          <CardDescription>Your compatibility with partner protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Aave V3", status: "Ready", rate: "11.5% APR" },
              { name: "Compound", status: "Ready", rate: "12.0% APR" },
              { name: "Morpho", status: "Coming Soon", rate: "TBD" },
            ].map((protocol) => (
              <div
                key={protocol.name}
                className="p-4 rounded-lg bg-background/50 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{protocol.name}</p>
                  <p className="text-xs text-muted-foreground">{protocol.rate}</p>
                </div>
                <Badge
                  variant={protocol.status === "Ready" ? "success" : "outline"}
                >
                  {protocol.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
