import Link from "next/link";
import { ArrowRight, Shield, Sparkles, Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="text-foreground">Private Financial</span>
            <br />
            <span className="gradient-text">Eligibility Layer</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlock <span className="text-primary font-medium">creator advances</span>,{" "}
            <span className="text-primary font-medium">merchant PayFi financing</span>, and{" "}
            <span className="text-primary font-medium">DeFi credit access</span> through 
            verifiable trust signals and privacy-preserving proofs.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center mb-16">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                Get Eligibility Score
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Privacy-Preserving</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Nexa ID Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>AI-Explained Decisions</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Trust Score", value: "85", suffix: "/100" },
                { label: "Available Credit", value: "$42,500", suffix: "" },
                { label: "Risk Tier", value: "Low", suffix: "" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                    <span className="text-sm text-muted-foreground">{stat.suffix}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Powered by Nexa ID on HashKey Chain</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
