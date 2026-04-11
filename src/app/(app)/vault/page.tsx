"use client";

import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Download, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Database,
  ArrowRight,
  Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { getDemoScenario } from "@/data/demo";
import { cn } from "@/lib/utils";

export default function VaultPage() {
  const scenario = getDemoScenario("approved-merchant")!;
  const { profile } = scenario;
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const proofs = [
    {
      id: "identity",
      name: "Sovereign Identity Proof",
      type: "Soul-bound Token",
      status: "Active",
      issued: "2024-03-15",
      provider: "Nexa ID V2",
      data: "did:velora:hashkey:0x71C...4f2a",
      icon: ShieldCheck
    },
    {
      id: "fin",
      name: "Merchant Revenue Proof",
      type: "ZK-Attestation",
      status: "Verified",
      issued: "2024-04-01",
      provider: "Velora AI",
      data: "gmv_verified_cycle_04_24",
      icon: Database
    },
    {
      id: "credit",
      name: "DeFi Trust Quotient",
      type: "Dynamic Score",
      status: "91/100",
      issued: "Real-time",
      provider: "HashKey Protocol",
      data: "credit_tier_platinum_active",
      icon: Sparkles
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-black text-[#F0F4FF] uppercase tracking-tight italic">Proof Vault</h1>
          <p className="text-[rgba(200,210,240,0.6)] text-lg">Your encrypted repository of institutional trust attestations.</p>
        </div>
        <Button variant="gradient" className="h-14 px-8 font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_10px_30px_rgba(6,214,192,0.2)]">
          Generate New Proof
          <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      </div>

      {/* Main Vault Grid */}
      <div className="grid gap-8">
        {proofs.map((proof) => (
          <Card key={proof.id} variant="glass" className="relative overflow-hidden group border-white/5 hover:border-white/20 transition-all duration-500">
            <div className="absolute inset-y-0 left-0 w-1 bg-[#06D6C0] opacity-30 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 bg-[#06D6C0]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <proof.icon className="h-8 w-8 text-[#06D6C0]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-display font-black text-[#F0F4FF] uppercase tracking-tight">{proof.name}</h3>
                      <Badge className="bg-white/5 text-[rgba(200,210,240,0.4)] border-white/10 px-2 py-0 text-[9px] font-black uppercase tracking-[0.2em]">{proof.type}</Badge>
                    </div>
                    <p className="text-sm text-[rgba(200,210,240,0.4)]">Issued by <span className="text-[#06D6C0] font-bold">{proof.provider}</span> • {proof.issued}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                  <div className="flex-1 md:flex-none min-w-[200px] h-14 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between px-6 font-mono text-xs text-[rgba(200,210,240,0.4)] overflow-hidden">
                    <span>{revealed[proof.id] ? proof.data : "••••••••••••••••••••"}</span>
                    <button onClick={() => toggleReveal(proof.id)} className="hover:text-[#F0F4FF] transition-colors">
                      {revealed[proof.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-white/5 hover:bg-white/5">
                      <Download className="h-5 w-5 text-[rgba(200,210,240,0.6)]" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-white/5 hover:bg-white/5">
                      <Share2 className="h-5 w-5 text-[rgba(200,210,240,0.6)]" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-white/5 hover:bg-white/5">
                      <ExternalLink className="h-5 w-5 text-[rgba(200,210,240,0.6)]" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass" className="p-8 space-y-6 bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="text-xl font-display font-black text-[#F0F4FF] uppercase tracking-widest text shadow-blue-500/20">Zero-Knowledge Security</h4>
          </div>
          <p className="text-sm text-[rgba(200,210,240,0.5)] leading-relaxed italic">
            Your Proof Vault uses advanced cryptographic primitives to ensure that third-party protocols can verify your credentials without ever seeing the underlying raw data.
          </p>
        </Card>

        <Card variant="glass" className="p-8 space-y-6 bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            </div>
            <h4 className="text-xl font-display font-black text-[#F0F4FF] uppercase tracking-widest text shadow-emerald-500/20">HashKey Verification</h4>
          </div>
          <p className="text-sm text-[rgba(200,210,240,0.5)] leading-relaxed italic">
            Each attestation in your vault is cross-referenced with the HashKey Chain consensus layer, providing institutional-grade validity for every asset and identity proof.
          </p>
        </Card>
      </div>
    </div>
  );
}
