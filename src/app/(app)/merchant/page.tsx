"use client";

import {
  TrendingUp,
  Calendar,
  DollarSign,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { getDemoScenario } from "@/data/demo";

export default function MerchantPage() {
  const scenario = getDemoScenario("approved-merchant")!;
  const { eligibility, profile } = scenario;
  const profileData = profile.profileData as {
    monthlySales: number;
    businessType: string;
    settlementFrequency: string;
    yearsInBusiness: number;
  };

  const [showExplanation, setShowExplanation] = useState(false);

  const availableCapital = eligibility.merchantFinanceLimit;
  const suggestedAmount = Math.round(availableCapital * 0.5);
  const feeRate = 8;
  const businessHealthScore = 85;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Merchant PayFi</h1>
          <p className="text-muted-foreground">
            Working capital financing based on your verified sales history.
          </p>
        </div>
        <Badge variant="gold" className="w-fit">
          Gold Trust • {eligibility.trustScore}/100
        </Badge>
      </div>

      {/* Business Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">Monthly Sales</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(profileData.monthlySales)}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building className="h-4 w-4" />
              <span className="text-sm">Business Type</span>
            </div>
            <p className="text-2xl font-bold">{profileData.businessType}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Years Active</span>
            </div>
            <p className="text-2xl font-bold">{profileData.yearsInBusiness} Years</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">Business Health</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-green-500">{businessHealthScore}</p>
              <span className="text-muted-foreground">/100</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Last 6 months of verified sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => {
                const value = 40000 + Math.random() * 15000;
                const percentage = (value / 55000) * 100;
                return (
                  <div key={month}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{month}</span>
                      <span className="text-sm font-medium">{formatCurrency(value)}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Proof-based business verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Business Identity</p>
                <p className="text-xs text-muted-foreground">Verified via Nexa ID</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Sales Verification</p>
                <p className="text-xs text-muted-foreground">6 months verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Payment Processing</p>
                <p className="text-xs text-muted-foreground">Card, Crypto, PayPal connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Settlement Frequency</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {profileData.settlementFrequency} settlements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financing Offer */}
      <Card variant="gradient" glow>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Financing Eligibility</CardTitle>
            <Badge variant="verified">Eligible</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Available Capital</p>
              <p className="text-5xl font-bold text-primary mb-4">
                {formatCurrency(availableCapital)}
              </p>
              <p className="text-sm text-muted-foreground">
                Based on {formatCurrency(profileData.monthlySales)}/month × 3x multiplier
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50">
                <p className="text-sm font-medium mb-3">Funding Preview</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Suggested Amount</span>
                    <span className="font-semibold">{formatCurrency(suggestedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fee Rate</span>
                    <span className="font-semibold">{feeRate}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Repayment Cycle</span>
                    <span className="font-semibold">Weekly</span>
                  </div>
                  <hr className="my-3 border-border" />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Est. Weekly Payment</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(Math.round(suggestedAmount / 12))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gradient" size="lg" className="flex-1">
              Apply for Financing
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              Customize Terms
            </Button>
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
              <CardTitle>Trust Rationale</CardTitle>
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
                Your business qualifies for up to{" "}
                <span className="font-bold text-green-400">{formatCurrency(availableCapital)}</span>{" "}
                in working capital based on verified monthly sales of{" "}
                {formatCurrency(profileData.monthlySales)}. Business health score: {businessHealthScore}/100.
              </p>
            </div>

            <div>
              <p className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Why You're Eligible
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Verified business identity through Nexa ID</li>
                <li>• Consistent sales volume over 6+ months</li>
                <li>• {profileData.yearsInBusiness} years of stable business operations</li>
                <li>• Multiple payment methods integrated</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium text-primary mb-2">💡 Recommendation</p>
              <p className="text-sm text-muted-foreground">
                Consider daily settlement to reduce fees by up to 15% and improve your business health score.
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
