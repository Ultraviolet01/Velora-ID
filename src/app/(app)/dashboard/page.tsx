"use client";

import { useEffect, useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  Building, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Database,
  Lock,
  Zap,
  Activity,
  BarChart3,
  ExternalLink,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { getDemoScenario } from "@/data/demo";
import Link from "next/link";
import { AppBackground } from "@/components/ui/app-background";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const scenario = getDemoScenario("approved-merchant")!;
  const { eligibility, profile } = scenario;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">Identity Hub</h1>
            <Badge variant="verified" className="bg-[#06D6C0]/10 text-[#06D6C0] border-[#06D6C0]/20 px-3 py-1 font-black uppercase tracking-widest text-[10px]">Active Session</Badge>
          </div>
          <p className="text-[rgba(200,210,240,0.6)] text-lg">Managing trust signals for <span className="text-[#F0F4FF] font-black">{profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}</span></p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
          <div className="h-10 w-10 bg-[#06D6C0]/10 rounded-xl flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-[#06D6C0]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.4)]">Verification Status</p>
            <p className="text-sm font-display font-bold text-[#F0F4FF]">Nexa V2 Certified</p>
          </div>
        </div>
      </div>

      {/* Main Score & Metrics */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trust Score Card */}
        <Card variant="gradient" className="lg:col-span-2 relative overflow-hidden group border-none shadow-[0_30px_60px_rgba(6,214,192,0.15)]">
          <div className="absolute inset-0 bg-[#040B1A]/40 backdrop-blur-3xl" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06D6C0]/10 blur-[120px] -mr-64 -mt-64 group-hover:bg-[#06D6C0]/15 transition-colors duration-1000" />
          
          <CardHeader className="relative z-10 p-10 pb-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-3xl font-display font-bold text-[#F0F4FF]">Institutional Trust Score</CardTitle>
              <CardDescription className="text-[rgba(200,210,240,0.6)] text-base">Your cross-chain credit reliability metric.</CardDescription>
            </div>
            <div className="h-14 w-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Sparkles className="h-7 w-7 text-[#06D6C0]" />
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 p-10 space-y-10">
            <div className="flex items-end gap-6">
              <span className="text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06D6C0] to-[#3B82F6] leading-none tracking-tighter tabular-nums">
                {eligibility.trustScore}
              </span>
              <div className="pb-4 space-y-1">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[rgba(160,175,210,0.4)]">Out of 100</p>
                <Badge className="bg-[#06D6C0]/10 text-[#06D6C0] border-none px-0 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Top 5% of Protocol
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[rgba(200,210,240,0.4)]">Protocol Health Analysis</p>
                <p className="text-sm font-display font-bold text-[#06D6C0]">Optimal</p>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-[#06D6C0] to-[#3B82F6] rounded-full shadow-[0_0_20px_rgba(6,214,192,0.5)] transition-all duration-1000 ease-out"
                  style={{ width: `${eligibility.trustScore}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Status */}
        <div className="space-y-8">
          <Card variant="glass" className="p-8 border-white/5 bg-[#020617]/40">
            <CardHeader className="p-0 mb-8">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-[#3B82F6]" />
                <CardTitle className="text-lg font-display font-black text-[#F0F4FF] uppercase tracking-widest">Active Proofs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-5">
              {[
                { name: "Identity SBT", status: "Verified", color: "text-[#06D6C0]" },
                { name: "Wallet Age", status: "624 Days", color: "text-[#3B82F6]" },
                { name: "DeFi Track", status: "A+ Grade", color: "text-[#818CF8]" },
              ].map((proof) => (
                <div key={proof.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all">
                  <span className="text-xs font-display font-bold text-[rgba(200,210,240,0.7)]">{proof.name}</span>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5", proof.color)}>{proof.status}</span>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-4 text-[rgba(200,210,240,0.4)] hover:text-[#06D6C0] hover:bg-[#06D6C0]/5 text-[10px] font-black uppercase tracking-widest gap-2">
                View Proof Vault <ExternalLink className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Capabilities */}
      <Card variant="glass" className="relative overflow-hidden border-white/5 bg-white/[0.01]">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#06D6C0] to-[#3B82F6]" />
        <CardHeader className="p-10 pb-4">
          <CardTitle className="text-3xl font-display font-bold text-[#F0F4FF]">Protocol Integration</CardTitle>
          <CardDescription className="text-lg text-[rgba(200,210,240,0.5)]">Your current borrowing and financing eligibility across the HashKey ecosystem.</CardDescription>
        </CardHeader>
        <CardContent className="p-10 pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 hover:bg-indigo-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-indigo-400" />
                </div>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-none font-black uppercase tracking-widest px-4 py-1.5 text-[10px]">Premium DeFi</Badge>
              </div>
              <h3 className="text-2xl font-display font-black text-[#F0F4FF] uppercase italic mb-2 tracking-tight">DeFi Capacity</h3>
              <p className="text-4xl font-display font-black text-indigo-400 tabular-nums">{formatCurrency(eligibility.defiBorrowLimit)}</p>
              <p className="text-sm text-[rgba(200,210,240,0.4)] mt-4 leading-relaxed">Maximum under-collateralized borrowing limit available across all verified liquidty pools.</p>
              <Link href="/defi">
                <Button className="w-full mt-8 bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase tracking-[0.2em] rounded-xl h-14">
                  Access Liquidity
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="group relative p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building className="h-8 w-8 text-emerald-400" />
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-none font-black uppercase tracking-widest px-4 py-1.5 text-[10px]">Gold Merchant</Badge>
              </div>
              <h3 className="text-2xl font-display font-black text-[#F0F4FF] uppercase italic mb-2 tracking-tight">PayFi Eligibility</h3>
              <p className="text-4xl font-display font-black text-emerald-400 tabular-nums">{formatCurrency(eligibility.merchantFinanceLimit)}</p>
              <p className="text-sm text-[rgba(200,210,240,0.4)] mt-4 leading-relaxed">Verified working capital allowance based on your documented business GMV history.</p>
              <Link href="/merchant">
                <Button className="w-full mt-8 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-[0.2em] rounded-xl h-14">
                  Unlock Capital
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
