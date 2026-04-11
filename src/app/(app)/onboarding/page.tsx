"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UserCircle, 
  ShieldCheck, 
  TrendingUp, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Zap,
  Lock,
  Globe,
  Database
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AppBackground } from "@/components/ui/app-background";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profileType, setProfileType] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else router.push("/dashboard");
  };

  const steps = [
    { title: "Profile Type", icon: UserCircle },
    { title: "Identity Proof", icon: ShieldCheck },
    { title: "Trust Scoring", icon: Zap },
    { title: "Access Grant", icon: Lock },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      {/* Stepper Header */}
      <div className="flex items-center justify-between px-4 overflow-x-auto gap-4 scrollbar-hide">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-4 flex-shrink-0">
            <div className={cn(
              "h-14 w-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
              step > i + 1 ? "bg-[#06D6C0] border-[#06D6C0] text-[#020617]" : 
              step === i + 1 ? "bg-[#06D6C0]/10 border-[#06D6C0] text-[#06D6C0] shadow-[0_0_20px_rgba(6,214,192,0.3)] scale-110" : 
              "bg-white/5 border-white/10 text-[rgba(200,210,240,0.3)]"
            )}>
              {step > i + 1 ? <CheckCircle2 className="h-6 w-6" /> : <s.icon className="h-6 w-6" />}
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "h-px w-10 md:w-20 bg-white/10",
                step > i + 1 && "bg-[#06D6C0]"
              )} />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-10">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">Define Your Identity</h2>
              <p className="text-[rgba(200,210,240,0.5)] text-lg">Select the profile type that best represents your HashKey Chain activity.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { id: "merchant", title: "Merchant PayFi", icon: Building, desc: "Unlock working capital based on sales volume.", color: "text-[#06D6C0]", bg: "hover:bg-[#06D6C0]/5" },
                { id: "defi", title: "DeFi Protocol", icon: TrendingUp, desc: "Access under-collateralized borrowing pools.", color: "text-[#3B82F6]", bg: "hover:bg-[#3B82F6]/5" },
                { id: "creator", title: "Content Creator", icon: Sparkles, desc: "Monetize engagement with social trust scoring.", color: "text-[#818CF8]", bg: "hover:bg-[#818CF8]/5" },
                { id: "institution", title: "Institutional", icon: Lock, desc: "Enterprise-grade trust proofs and compliance.", color: "text-[#FBBF24]", bg: "hover:bg-[#FBBF24]/5" },
              ].map((type) => (
                <Card 
                  key={type.id}
                  variant="glass"
                  className={cn(
                    "p-10 cursor-pointer transition-all duration-500 overflow-hidden group relative",
                    profileType === type.id ? "border-[#06D6C0] bg-[#06D6C0]/5 ring-1 ring-[#06D6C0]/50" : "border-white/5 hover:border-white/20",
                    type.bg
                  )}
                  onClick={() => setProfileType(type.id)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                  <div className="flex items-center gap-8 relative z-10">
                    <div className={cn("h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110 duration-500", type.color)}>
                      <type.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-display font-black text-[#F0F4FF] uppercase tracking-tight italic">{type.title}</p>
                      <p className="text-sm text-[rgba(200,210,240,0.5)] leading-relaxed">{type.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">Identity Anchor</h2>
              <p className="text-[rgba(200,210,240,0.5)] text-lg">Initialize your global identity anchor through Nexa ID V2.</p>
            </div>
            <Card variant="glass" className="p-12 relative overflow-hidden group border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06D6C0]/5 blur-[120px] -mr-64 -mt-64" />
              <div className="flex flex-col items-center gap-10 relative z-10 py-10">
                <div className="h-32 w-32 bg-gradient-to-br from-[#06D6C0] to-[#3B82F6] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(6,214,192,0.3)] animate-pulse">
                  <ShieldCheck className="h-16 w-16 text-white" />
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-display font-black text-[#F0F4FF] uppercase italic">Secure Handshake</h3>
                  <p className="text-[rgba(200,210,240,0.6)] max-w-md mx-auto leading-relaxed">
                    By confirming this connection, your wallet will be bound to an immutable Soul-Bound Token (SBT) standards defined by HashKey.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                  {[
                    { icon: Globe, label: "Liveness" },
                    { icon: Lock, label: "Encryption" },
                    { icon: Database, label: "Anchor" },
                    { icon: CheckCircle2, label: "Consensus" },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                      <item.icon className="h-5 w-5 text-[#06D6C0] mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.4)]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">Calculating Trust</h2>
              <p className="text-[rgba(200,210,240,0.5)] text-lg">Our protocol is analyzing 620+ trust data points across your wallet history.</p>
            </div>
            <Card variant="glass" className="p-12 space-y-12 bg-white/[0.02] border-white/10">
              <div className="space-y-8">
                {[
                  { label: "On-Chain Repayment History", val: 85, color: "bg-[#06D6C0]" },
                  { label: "KYC/AML Data Signals", val: 100, color: "bg-[#3B82F6]" },
                  { label: "Social Proof Attestations", val: 42, color: "bg-[#818CF8]" },
                ].map((p, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgba(200,210,240,0.5)]">{p.label}</span>
                      <span className="text-sm font-display font-bold text-[#F0F4FF]">{p.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000 ease-out", p.color)} style={{ width: `${p.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 rounded-3xl bg-[#06D6C0]/5 border border-[#06D6C0]/20 flex items-center gap-6">
                <Sparkles className="h-8 w-8 text-[#06D6C0] shrink-0" />
                <p className="text-sm text-[rgba(200,210,240,0.7)] leading-relaxed italic">
                  "Artificial Intelligence scoring complete. Preliminary trust quotient found in the top 10% of HashKey Chain users."
                </p>
              </div>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-in zoom-in-95 duration-1000">
            <div className="text-center space-y-3">
              <h2 className="text-5xl md:text-6xl font-display font-black text-[#F0F4FF] uppercase tracking-tighter italic">Welcome to the Elite</h2>
              <p className="text-[rgba(200,210,240,0.5)] text-lg">Your Velora ID has been anchored. You now have full access to institutional liquidity pools.</p>
            </div>
            <Card variant="gradient" className="p-16 relative overflow-hidden group border-none shadow-[0_50px_100px_rgba(6,214,192,0.2)]">
              <div className="absolute inset-0 bg-[#040B1A]/40 backdrop-blur-3xl" />
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#06D6C015,transparent_50%)]" />
              <div className="flex flex-col items-center gap-12 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#06D6C0] blur-3xl opacity-20" />
                  <div className="h-40 w-40 bg-white/5 border border-white/20 rounded-[3rem] flex items-center justify-center backdrop-blur-3xl">
                    <Sparkles className="h-20 w-20 text-[#06D6C0]" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-black uppercase tracking-[0.5em] text-[#06D6C0]">Identity Anchored</p>
                  <p className="text-6xl font-display font-black text-[#F0F4FF] tracking-tighter">PLATINUM TRUST</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="grid grid-cols-3 gap-10 w-full text-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.3)] mb-2">Access Type</p>
                    <p className="font-display font-bold text-[#F0F4FF]">Institutional</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.3)] mb-2">Borrow Limit</p>
                    <p className="font-display font-bold text-[#06D6C0]">$250k+</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[rgba(200,210,240,0.3)] mb-2">Network Rule</p>
                    <p className="font-display font-bold text-[#F0F4FF]">HashKey</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-center pt-10">
          <Button 
            size="xl" 
            className="h-20 px-12 group transition-all duration-500 rounded-none clip-path-polygon-[0%_0%,100%_0%,95%_100%,5%_100%] bg-gradient-to-r from-[#06D6C0] to-[#3B82F6] hover:scale-[1.05] shadow-[0_20px_40px_rgba(6,214,192,0.2)]"
            onClick={handleNext}
            disabled={step === 1 && !profileType}
          >
            <span className="font-display font-black text-sm uppercase tracking-[0.4em] text-[#020617]">
              {step === 4 ? "Enter Dashboard" : "Initiate Next Phase"}
            </span>
            <ArrowRight className="ml-4 h-6 w-6 text-[#020617] transition-transform group-hover:translate-x-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
