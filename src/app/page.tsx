"use client";

import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, Lock, Coins, Sparkles, MoveRight, ChevronRight, BarChart3, Database, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import { AppBackground } from "@/components/ui/app-background";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] selection:bg-[#06D6C0]/30 selection:text-[#06D6C0]">
      <AppBackground variant="landing" />
      <Navbar />

      <main className="relative z-10 pt-32">
        {/* Simplified Hero */}
        <div className="container px-6 mx-auto">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all cursor-default group">
              <div className="h-2 w-2 rounded-full bg-[#06D6C0] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[rgba(200,210,240,0.6)] group-hover:text-[#F0F4FF]">Now Live on HashKey Chain Testnet</span>
              <ChevronRight className="h-3 w-3 text-[rgba(200,210,240,0.4)]" />
            </div>

            <h1 className="text-7xl md:text-9xl font-display font-black text-[#F0F4FF] tracking-tighter leading-[0.85] uppercase">
              The Protocol <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06D6C0] via-[#3B82F6] to-[#6366F1] animate-gradient-x">
                Of Trust.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-[rgba(200,210,240,0.6)] leading-relaxed font-medium">
              Institutional-grade identity verification and trust scoring. 
              Unlock the full potential of HashKey Chain with Velora ID.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link href="/onboarding">
                <Button size="xl" className="h-20 px-12 text-sm font-black uppercase tracking-[0.3em] bg-[#F0F4FF] text-[#020617] hover:bg-white rounded-none clip-path-polygon-[0%_0%,100%_0%,95%_100%,0%_100%] transition-all hover:scale-[1.02] shadow-[0_20px_40px_rgba(255,255,255,0.1)] group">
                  Get Started
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/vault">
                <Button size="xl" variant="outline" className="h-20 px-12 text-sm font-black uppercase tracking-[0.3em] border-white/10 text-[#F0F4FF] hover:bg-white/5 backdrop-blur-md transition-all">
                  Proof Vault
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Why HashKey Chain Infrastructure Section */}
        <div id="infrastructure" className="container px-6 mx-auto pt-48 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 text-[#06D6C0] font-black uppercase tracking-[0.3em] text-[10px]">
                  <Database className="h-4 w-4" />
                  <span>Architecture</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-black text-[#F0F4FF] leading-none uppercase italic tracking-tighter">
                  Powered by <br />
                  <span className="text-[#3B82F6]">HashKey Chain</span>
                </h2>
                <p className="text-xl text-[rgba(200,210,240,0.6)] leading-relaxed max-w-xl">
                  Velora ID leverages HashKey Chain's enterprise-ready infrastructure to deliver sub-second identity resolution with sovereign security.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  {[
                    { title: "SBT Standards", desc: "Soul-bound tokens for immutable proof of identity." },
                    { title: "Native ZK", desc: "Built-in zero-knowledge proofs for privacy-first scoring." }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-none border-l-2 border-[#06D6C0] bg-white/[0.02]">
                      <h4 className="font-display font-black text-[#F0F4FF] uppercase tracking-wider mb-2">{item.title}</h4>
                      <p className="text-sm text-[rgba(200,210,240,0.4)] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#06D6C0]/20 to-[#3B82F6]/20 blur-[100px] opacity-30" />
                <div className="grid gap-6 relative z-10">
                  <Card className="glass-card group hover:bg-white/[0.05] border-white/5 hover:border-[#06D6C0]/30 transition-all duration-500 rounded-none overflow-hidden p-8">
                    <CardContent className="p-0 flex gap-6">
                      <div className="h-16 w-16 flex-shrink-0 bg-[#06D6C0]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Lock className="h-8 w-8 text-[#06D6C0]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">Institutional Security</h3>
                        <p className="text-[rgba(200,210,240,0.5)] leading-relaxed">HSM-backed identity anchors ensuring enterprise-level protection for every user profile.</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group hover:bg-white/[0.05] border-white/5 hover:border-[#3B82F6]/30 transition-all duration-500 rounded-none overflow-hidden p-8">
                    <CardContent className="p-0 flex gap-6">
                      <div className="h-16 w-16 flex-shrink-0 bg-[#3B82F6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Zap className="h-8 w-8 text-[#3B82F6]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">EVM Performance</h3>
                        <p className="text-[rgba(200,210,240,0.5)] leading-relaxed">High-throughput execution for real-time credit scoring and instant DeFi eligibility.</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group hover:bg-white/[0.05] border-white/5 hover:border-[#6366F1]/30 transition-all duration-500 rounded-none overflow-hidden p-8">
                    <CardContent className="p-0 flex gap-6">
                      <div className="h-16 w-16 flex-shrink-0 bg-[#6366F1]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Workflow className="h-8 w-8 text-[#6366F1]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">Cross-Protocol Sync</h3>
                        <p className="text-[rgba(200,210,240,0.5)] leading-relaxed">Seamlessly integrate your Velora ID with any DeFi or PayFi application on HashKey Chain.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="container px-6 mx-auto py-32 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Nexa ID Verification",
                description: "AI-driven identity verification that binds real-world credentials to your wallet securely.",
                color: "from-emerald-400 to-cyan-400"
              },
              {
                icon: BarChart3,
                title: "Trust Scoring",
                description: "Dynamic algorithms calculate your reliability score based on on-chain activity and proofs.",
                color: "from-blue-400 to-indigo-400"
              },
              {
                icon: Workflow,
                title: "Verified Capacity",
                description: "Unlock under-collateralized loans and higher merchant financing limits instantly.",
                color: "from-indigo-400 to-purple-400"
              }
            ].map((feature, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity`} />
                <div className="relative p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500">
                  <feature.icon className="h-12 w-12 text-[#F0F4FF] mb-8" />
                  <h3 className="text-2xl font-display font-bold text-[#F0F4FF] mb-4 uppercase italic tracking-tight">{feature.title}</h3>
                  <p className="text-[rgba(200,210,240,0.5)] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer-like Branding */}
      <footer className="relative z-10 border-t border-white/5 py-20">
        <div className="container px-6 mx-auto flex flex-col items-center space-y-8">
          <div className="text-4xl font-display font-black text-[#F0F4FF] italic tracking-[0.2em] uppercase opacity-20">
            Velora ID
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[rgba(200,210,240,0.3)]">
            Institutional Trust Infrastructure • 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
