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
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, cn } from "@/lib/utils";
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
          <h1 className="text-3xl font-display font-bold text-[#F0F4FF]">DeFi Credit Access</h1>
          <p className="text-[rgba(200,210,240,0.6)] mt-1">
            Under-collateralized borrowing powered by verified trust signals.
          </p>
        </div>
        <Badge variant="platinum" className="w-fit">
          Platinum Trust • {eligibility.trustScore}/100
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <Coins className="h-3 w-3" />
              <span>Credit Limit</span>
            </div>
            <p className="text-4xl font-display font-black text-[#06D6C0] tabular-nums">{formatCurrency(creditLimit)}</p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#06D6C0]/5 blur-2xl rounded-full group-hover:bg-[#06D6C0]/10 transition-colors" />
          </CardContent>
        </Card>

        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <TrendingUp className="h-3 w-3" />
              <span>Credit Tier</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-display font-black text-[#F0F4FF]">Platinum</p>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors" />
          </CardContent>
        </Card>

        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <Percent className="h-3 w-3" />
              <span>Interest Rate</span>
            </div>
            <p className="text-4xl font-display font-black text-[#F0F4FF] tabular-nums">{interestRate}% <span className="text-sm font-black text-[rgba(200,210,240,0.4)]">APR</span></p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors" />
          </CardContent>
        </Card>

        <Card variant="glass" className="relative group overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex items-center gap-2 text-[rgba(200,210,240,0.4)] mb-3 uppercase tracking-widest text-[10px] font-black">
              <Lock className="h-3 w-3" />
              <span>Collateral</span>
            </div>
            <p className="text-4xl font-display font-black text-[#F0F4FF] capitalize">{collateralFlexibility}</p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors" />
          </CardContent>
        </Card>
      </div>

      {/* Credit Simulation */}
      <Card variant="gradient" className="relative overflow-hidden group border-none shadow-[0_20px_50px_rgba(6,214,192,0.1)]">
        <div className="absolute inset-0 bg-[#040B1A]/40 backdrop-blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06D6C0]/5 blur-[120px] -mr-64 -mt-64" />
        <CardHeader className="relative z-10 p-10 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-display font-bold text-[#F0F4FF]">Credit Simulation</CardTitle>
              <CardDescription className="text-[rgba(200,210,240,0.6)] text-base mt-2">
                Real-time borrowing capacity based on current trust score.
              </CardDescription>
            </div>
            <Badge variant="verified" className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest">Premium Access</Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 p-10 space-y-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-[rgba(160,175,210,0.4)] uppercase tracking-[0.3em] mb-4">Maximum Capacity</p>
                <p className="text-7xl font-display font-black text-[#F0F4FF] leading-none tracking-tighter tabular-nums">
                  {formatCurrency(creditLimit)}
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                <p className="text-sm text-[rgba(200,210,240,0.7)] leading-relaxed">
                  You are in the <span className="text-[#06D6C0] font-bold">Top 2%</span> of borrowers. Your trust score of <span className="text-[#06D6C0] font-bold">{eligibility.trustScore}/100</span> unlocks under-collateralized borrowing protocols.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] bg-[#040B1A] border border-white/5 relative shadow-inner overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#06D6C0] to-[#3B82F6]" />
                <p className="text-[10px] font-black text-[rgba(160,175,210,0.4)] uppercase tracking-[0.2em] mb-6">Borrow Preview</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[rgba(200,210,240,0.6)]">Requested Principal</span>
                    <span className="font-display font-bold text-[#F0F4FF] text-lg">{formatCurrency(suggestedBorrow)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[rgba(200,210,240,0.6)]">Interest Rate</span>
                    <span className="font-display font-bold text-[#06D6C0] text-lg">{interestRate}% APR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[rgba(200,210,240,0.6)]">Collateral Required</span>
                    <span className="font-display font-bold text-[#F0F4FF] text-lg">60% LTV</span>
                  </div>
                  <div className="h-px bg-white/5 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-widest text-[rgba(160,175,210,0.4)]">Monthly Cost</span>
                    <span className="text-2xl font-display font-black text-[#3B82F6]">
                      {formatCurrency(Math.round((suggestedBorrow * interestRate) / 100 / 12))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button variant="gradient" size="xl" className="flex-1 h-18 font-display font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_50px_rgba(6,214,192,0.2)] hover:scale-[1.02] transition-all">
              Initiate Secure Borrow
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            <Button variant="outline" size="xl" className="px-10 h-18 bg-white/5 border-white/5 text-[rgba(200,210,240,0.6)] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 hover:text-[#F0F4FF] transition-all">
              Adjust Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pool Access & Trust Verification */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card variant="glass" className="relative overflow-hidden p-4">
          <CardHeader>
            <CardTitle className="font-display text-xl tracking-tight">Pool Access</CardTitle>
            <CardDescription className="text-[rgba(200,210,240,0.6)]">Your cross-protocol eligibility status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Premium Pools", desc: "Lower rates, higher limits", status: "Unlocked", icon: Sparkles, color: "text-[#06D6C0]" },
              { name: "Standard Pools", desc: "Base-rate borrowing", status: "Unlocked", icon: CheckCircle2, color: "text-[#3B82F6]" },
              { name: "Institutional Pools", desc: "95+ trust score required", status: "Locked", icon: Lock, color: "text-[rgba(200,210,240,0.3)]" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center gap-5">
                  <div className={cn("h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform", p.color)}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#F0F4FF]">{p.name}</p>
                    <p className="text-xs text-[rgba(200,210,240,0.4)]">{p.desc}</p>
                  </div>
                </div>
                <Badge className={cn(
                  "px-3 py-1 text-[10px] font-black uppercase tracking-widest border",
                  p.status === "Unlocked" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-white/5 text-[rgba(200,210,240,0.3)] border-white/5"
                )}>{p.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card variant="glass" className="relative overflow-hidden p-4">
          <CardHeader>
            <CardTitle className="font-display text-xl tracking-tight">Verified Signals</CardTitle>
            <CardDescription className="text-[rgba(200,210,240,0.6)]">Key trust factors powering your limit</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              { name: "Identity Proof", sub: "HashKey SBT", icon: Shield },
              { name: "Wallet Age", sub: "600+ Days", icon: Clock },
              { name: "DeFi Activity", sub: "Bluechip protocols", icon: Coins },
              { name: "Repayment", sub: "Positive Track", icon: CheckCircle2 },
            ].map((s) => (
              <div key={s.name} className="p-5 rounded-3xl bg-[#06D6C0]/5 border border-[#06D6C0]/10 text-center hover:bg-[#06D6C0]/10 transition-colors group">
                <s.icon className="h-8 w-8 text-[#06D6C0] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-display font-bold text-[#F0F4FF]">{s.name}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#06D6C0] opacity-60 mt-1">{s.sub}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Accepted Collateral */}
      <Card variant="glass" className="p-4">
        <CardHeader>
          <CardTitle className="font-display text-xl tracking-tight">Accepted Assets</CardTitle>
          <CardDescription className="text-[rgba(200,210,240,0.6)]">Asset types currently eligible for collateralized positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["ETH", "WBTC", "USDC", "USDT", "DAI", "LINK", "UNI", "AAVE"].map((token) => (
              <div
                key={token}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center hover:border-[#06D6C0]/20 hover:bg-[#06D6C0]/5 transition-all group"
              >
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Coins className="h-6 w-6 text-[#F0F4FF] opacity-60" />
                </div>
                <p className="font-display font-bold text-[#F0F4FF] text-lg">{token}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#06D6C0] mt-1">
                  {token === "USDC" || token === "USDT" || token === "DAI" ? "65% LTV" : "60% LTV"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Protocol Readiness */}
      <Card variant="glass" className="p-4 border-t-4 border-t-[#3B82F6]">
        <CardHeader>
          <CardTitle className="font-display text-xl tracking-tight">Protocol Sync</CardTitle>
          <CardDescription className="text-[rgba(200,210,240,0.6)]">Your compatibility with liquidity partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Aave V3", status: "Ready", rate: "11.5% APR", icon: Shield },
              { name: "Compound", status: "Ready", rate: "12.0% APR", icon: Shield },
              { name: "Morpho", status: "Coming Soon", rate: "TBD", icon: Clock },
            ].map((protocol) => (
              <div
                key={protocol.name}
                className="p-6 rounded-[2rem] bg-[#040B1A] border border-white/5 flex items-center justify-between group hover:border-[#3B82F6]/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <protocol.icon className={cn("h-5 w-5", protocol.status === "Ready" ? "text-[#3B82F6]" : "text-[rgba(200,210,240,0.2)]")} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#F0F4FF]">{protocol.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.4)] mt-1">{protocol.rate}</p>
                  </div>
                </div>
                <Badge
                  variant={protocol.status === "Ready" ? "verified" : "outline"}
                  className="px-3 py-1 font-black text-[9px] uppercase tracking-widest"
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
