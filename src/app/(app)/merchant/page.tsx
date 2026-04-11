"use client";

import {
  TrendingUp,
  Calendar,
  DollarSign,
  Building,
  CheckCircle2,
  Lock,
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
import { formatCurrency, cn } from "@/lib/utils";
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
          <h1 className="text-3xl font-display font-bold text-[#F0F4FF]">Merchant PayFi</h1>
          <p className="text-[rgba(200,210,240,0.6)] mt-1">
            Working capital financing based on your verified sales history.
          </p>
        </div>
        <Badge variant="gold" className="w-fit">
          Gold Trust • {eligibility.trustScore}/100
        </Badge>
      </div>

      {/* Business Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <DollarSign className="h-3 w-3" />
              <span>Monthly Sales</span>
            </div>
            <p className="text-4xl font-display font-black text-[#06D6C0] tabular-nums">{formatCurrency(profileData.monthlySales)}</p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#06D6C0]/5 blur-2xl rounded-full group-hover:bg-[#06D6C0]/10 transition-colors" />
          </CardContent>
        </Card>

        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <Building className="h-3 w-3" />
              <span>Business Type</span>
            </div>
            <p className="text-3xl font-display font-black text-[#F0F4FF]">{profileData.businessType}</p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors" />
          </CardContent>
        </Card>

        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <Calendar className="h-3 w-3" />
              <span>Years Active</span>
            </div>
            <p className="text-4xl font-display font-black text-[#F0F4FF] tabular-nums">{profileData.yearsInBusiness} <span className="text-sm font-black text-[rgba(200,210,240,0.4)]">YRS</span></p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors" />
          </CardContent>
        </Card>

        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <BarChart3 className="h-3 w-3" />
              <span>Health Score</span>
            </div>
            <div className="flex items-end gap-1">
              <p className="text-4xl font-display font-black text-[#06D6C0] tabular-nums">{businessHealthScore}</p>
              <span className="text-sm font-black text-[rgba(200,210,240,0.4)] mb-1">/100</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#06D6C0]/5 blur-2xl rounded-full group-hover:bg-[#06D6C0]/10 transition-colors" />
          </CardContent>
        </Card>
      </div>

      {/* Financing Offer */}
      <Card variant="gradient" className="relative overflow-hidden group border-none shadow-[0_20px_50px_rgba(251,191,36,0.1)]">
        <div className="absolute inset-0 bg-[#040B1A]/40 backdrop-blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 blur-[120px] -mr-64 -mt-64" />
        <CardHeader className="relative z-10 p-10 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-display font-bold text-[#F0F4FF]">Financing Eligibility</CardTitle>
              <CardDescription className="text-[rgba(200,210,240,0.6)] text-base mt-2">
                Maximum working capital based on verified business GMV.
              </CardDescription>
            </div>
            <Badge variant="verified" className="bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest">Active Offer</Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 p-10 space-y-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-[rgba(160,175,210,0.4)] uppercase tracking-[0.3em] mb-4">Available Capital</p>
                <p className="text-7xl font-display font-black text-[#F0F4FF] leading-none tracking-tighter tabular-nums text-[#FBBF24]">
                  {formatCurrency(availableCapital)}
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                <p className="text-sm text-[rgba(200,210,240,0.7)] leading-relaxed">
                   Based on verified monthly sales of <span className="text-[#FBBF24] font-bold">{formatCurrency(profileData.monthlySales)}</span> and a <span className="text-[#FBBF24] font-bold">3x growth multiplier</span> calculated by Velora AI.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] bg-[#040B1A] border border-white/5 relative shadow-inner overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500" />
                <p className="text-[10px] font-black text-[rgba(160,175,210,0.4)] uppercase tracking-[0.2em] mb-6">Funding Preview</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[rgba(200,210,240,0.6)]">Suggested Funding</span>
                    <span className="font-display font-bold text-[#F0F4FF] text-lg">{formatCurrency(suggestedAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[rgba(200,210,240,0.6)]">Flat Fee Rate</span>
                    <span className="font-display font-bold text-[#FBBF24] text-lg">{feeRate}% Total</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[rgba(200,210,240,0.6)]">Repayment Cycle</span>
                    <span className="font-display font-bold text-[#F0F4FF] text-lg">Weekly</span>
                  </div>
                  <div className="h-px bg-white/5 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-widest text-[rgba(160,175,210,0.4)]">Weekly Target</span>
                    <span className="text-2xl font-display font-black text-yellow-500">
                      {formatCurrency(Math.round(suggestedAmount / 12))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button variant="gradient" size="xl" className="flex-1 h-18 font-display font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_50px_rgba(251,191,36,0.2)] hover:scale-[1.02] transition-all bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 border-none">
              Apply for Capital
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            <Button variant="outline" size="xl" className="px-10 h-18 bg-white/5 border-white/5 text-[rgba(200,210,240,0.6)] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 hover:text-[#F0F4FF] transition-all">
              Customize Terms
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales & Verification */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card variant="glass" className="relative overflow-hidden p-4">
          <CardHeader>
            <CardTitle className="font-display text-xl tracking-tight">Sales Overview</CardTitle>
            <CardDescription className="text-[rgba(200,210,240,0.6)]">6-month verified growth trajectory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => {
              const value = 40000 + Math.random() * 15000;
              const percentage = (value / 55000) * 100;
              return (
                <div key={month} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[rgba(200,210,240,0.4)] group-hover:text-[#F0F4FF] transition-colors">{month}</span>
                    <span className="text-sm font-display font-bold text-[#F0F4FF] tabular-nums">{formatCurrency(value)}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#06D6C0] to-[#3B82F6] rounded-full shadow-[0_0_10px_rgba(6,214,192,0.3)] transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card variant="glass" className="relative overflow-hidden p-4">
          <CardHeader>
            <CardTitle className="font-display text-xl tracking-tight">Financial Trust Proofs</CardTitle>
            <CardDescription className="text-[rgba(200,210,240,0.6)]">Merchant credentials verified on HashKey Chain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Business Identity", desc: "Verified via Nexa ID SBT", status: "Verified" },
              { name: "Sales Volume", desc: "6-month bank & card sync", status: "Audited" },
              { name: "Settlement Track", desc: "Daily settlement history", status: "Verified" },
              { name: "Global Entity", desc: "HashKey Chain business proof", status: "Active" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-[#06D6C0]/10 flex items-center justify-center border border-[#06D6C0]/20 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-6 w-6 text-[#06D6C0]" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#F0F4FF]">{p.name}</p>
                    <p className="text-xs text-[rgba(200,210,240,0.4)]">{p.desc}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest">{p.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Integration Readiness */}
      <Card variant="glass" className="p-4 border-t-4 border-t-orange-500/50">
        <CardHeader>
          <CardTitle className="font-display text-xl tracking-tight">Connect Channels</CardTitle>
          <CardDescription className="text-[rgba(200,210,240,0.6)]">Verified data sources for real-time financing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Shopify", status: "Connected" },
              { name: "Stripe", status: "Connected" },
              { name: "PayPal", status: "Ready" },
              { name: "Amazon", status: "Ready" },
            ].map((channel) => (
              <div
                key={channel.name}
                className="p-6 rounded-[2rem] bg-[#040B1A] border border-white/5 text-center group hover:border-orange-500/30 transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className={cn("h-6 w-6", channel.status === "Connected" ? "text-orange-500" : "text-[rgba(200,210,240,0.2)]")} />
                </div>
                <p className="font-display font-bold text-[#F0F4FF]">{channel.name}</p>
                <p className={cn(
                  "text-[10px] font-black uppercase tracking-widest mt-2",
                  channel.status === "Connected" ? "text-green-500" : "text-[rgba(200,210,240,0.3)]"
                )}>
                  {channel.status}
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
