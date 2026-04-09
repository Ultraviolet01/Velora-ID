"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Wallet,
  Shield,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Link as LinkIcon,
  Search,
  Globe,
  Lock,
  Play,
  Store,
  Wallet2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency, shortenAddress } from "@/lib/utils";
import { ProfileType, OnboardingState, EligibilityResult } from "@/types";
import { eligibilityService } from "@/services/eligibility";
import { multiChainService, MultiChainStats } from "@/services/multi-chain";
import { SolanaConnect } from "@/components/web3/solana-connect";

const STEPS = [
  { id: 1, title: "Connect", icon: Wallet },
  { id: 2, title: "Link Solana", icon: LinkIcon },
  { id: 3, title: "Profile", icon: User },
  { id: 4, title: "HashKey KYC", icon: Shield },
  { id: 5, title: "Scan Activity", icon: Search },
  { id: 6, title: "Complete", icon: CheckCircle2 },
];

const PROFILE_TYPES = [
  {
    type: "creator" as ProfileType,
    title: "Creator",
    description: "Monetize future content revenue — YouTube, TikTok, Twitch, X.",
    icon: Play,
  },
  {
    type: "merchant" as ProfileType,
    title: "Merchant",
    description: "PayFi financing against on-chain transaction volume and GMV.",
    icon: Store,
  },
  {
    type: "defi" as ProfileType,
    title: "DeFi Borrower",
    description: "Undercollateralized credit lines scored by your Velora ID.",
    icon: Wallet2,
  },
];

function OnboardingContent() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const searchParams = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize step from URL if present
  useEffect(() => {
    const step = searchParams.get("step");
    if (step) {
      const stepNum = parseInt(step);
      if (stepNum >= 1 && stepNum <= STEPS.length) {
        setCurrentStep(stepNum);
      }
    }
  }, [searchParams]);

  const [onboarding, setOnboarding] = useState<OnboardingState & { solanaAddress?: string; evmVerified: boolean; displayName: string }>({
    currentStep: 1,
    walletConnected: false,
    profileType: null,
    profileData: {},
    nexaIdStarted: false,
    nexaIdCompleted: false,
    eligibilityCalculated: false,
    completed: false,
    evmVerified: false,
    displayName: "",
  });
  
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [multiChainStats, setMultiChainStats] = useState<MultiChainStats | null>(null);
  const [kycInfo, setKycInfo] = useState<{ level: number, status: number, isApproved: boolean } | null>(null);

  const [formData, setFormData] = useState({
    monthlyInflow: "5000",
    paymentFrequency: "monthly",
    platforms: "YouTube",
    monthlySales: "10000",
    businessType: "E-commerce",
    preferredBorrowMin: "5000",
    preferredBorrowMax: "20000",
    riskTolerance: "moderate",
  });

  // Handle EVM Ownership Verification (Backend Sync)
  const verifyEvmOwnership = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const message = `Verify EVM ownership for Velora ID: ${new Date().toISOString()}`;
      const signature = await signMessageAsync({ message });
      
      const response = await fetch("/api/onboarding/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          message,
          signature,
          solanaAddress: onboarding.solanaAddress,
        }),
      });

      if (!response.ok) throw new Error("Verification failed");
      
      setOnboarding(prev => ({ ...prev, evmVerified: true }));
      setCurrentStep(2);
    } catch (error) {
      console.error("Signature failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  const checkHashKeyKyc = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      // Dynamic import to avoid SSR issues if any
      const { hashKeyKycService } = await import("@/services/hashkey-kyc");
      const info = await hashKeyKycService.getKycInfo(address as `0x${string}`);
      
      if (info) {
        setKycInfo(info);
        if (info.isApproved) {
          setOnboarding((prev) => ({ ...prev, nexaIdCompleted: true }));
          // Give a brief success animation before moving
          await new Promise(r => setTimeout(r, 1000));
          setCurrentStep(5);
        }
      }
    } catch (error) {
      console.error("KYC check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectProfile = (type: ProfileType) => {
    setOnboarding((prev) => ({ ...prev, profileType: type }));
  };

  // Calculate Eligibility using Secure Backend Proxy
  const calculateUserEligibility = async () => {
    if (!address) return;
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/reputation/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          evmAddress: address,
          solanaAddress: onboarding.solanaAddress,
          profileType: onboarding.profileType,
          profileData: {
            displayName: onboarding.displayName,
            monthlyInflow: parseFloat(formData.monthlyInflow),
            monthlySales: parseFloat(formData.monthlySales),
            kycLevel: kycInfo?.level,
            kycStatus: kycInfo?.status,
          }
        }),
      });

      if (!response.ok) throw new Error("Scan failed");
      
      const { result, stats } = await response.json();
      setMultiChainStats(stats);
      setEligibilityResult(result);
      
      await new Promise((r) => setTimeout(r, 2000)); // Visual pause for "Scanning" ui
      setOnboarding((prev) => ({ ...prev, eligibilityCalculated: true }));
      setCurrentStep(6);
    } catch (error) {
      console.error("Eligibility calculation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold gradient-text">Velora ID</span>
          </Link>
          {isConnected && address && (
            <Badge variant="outline" className="font-mono">
              {shortenAddress(address)}
            </Badge>
          )}
        </div>
      </header>

      {/* Progress Tracker */}
      <div className="border-b border-border bg-card/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5 shadow-[0_0_10px_rgba(0,210,255,0.1)]" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-xl"
          >
            {/* Step 1: Connect Wallet (EVM) */}
            {currentStep === 1 && (
              <Card variant="glass" className="text-center p-6 border-primary/20">
                <CardHeader>
                  <div className="h-20 w-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 rotate-3">
                    <Wallet className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Connect EVM Wallet</CardTitle>
                  <CardDescription className="text-base">
                    Connect your primary wallet on HashKey Chain to begin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-4">
                  <div className="mb-8 scale-110">
                    <ConnectButton.Custom>
                      {({ account, chain, openConnectModal, mounted }) => {
                        const ready = mounted;
                        const connected = ready && account && chain;
                        return (
                          <div
                            {...(!ready && {
                              'aria-hidden': true,
                              style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
                            })}
                          >
                            {!connected && (
                              <button 
                                onClick={openConnectModal} 
                                className="text-primary hover:text-primary/80 transition-colors text-xl font-normal"
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        );
                      }}
                    </ConnectButton.Custom>
                  </div>
                  {isConnected && !onboarding.evmVerified && (
                    <Button variant="gradient" size="xl" className="w-full h-14 font-normal" onClick={verifyEvmOwnership} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Lock className="h-5 w-5 mr-2" />
                          Sign to Verify Ownership
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                  {onboarding.evmVerified && (
                    <p className="text-sm text-green-400 font-normal flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4" />
                       Ownership Verified
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Link Solana (Optional) */}
            {currentStep === 2 && (
              <Card variant="glass" className="p-6 border-primary/20">
                <CardHeader className="text-center">
                  <div className="h-20 w-20 mx-auto mb-6 rounded-3xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 -rotate-3">
                    <LinkIcon className="h-10 w-10 text-purple-400" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Link Solana Identity</CardTitle>
                  <CardDescription className="text-base px-8">
                    Boost your trust score by linking your Solana activity. This step is optional.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 pt-4">
                  <SolanaConnect 
                    onVerify={(addr) => setOnboarding(prev => ({ ...prev, solanaAddress: addr }))}
                    onClear={() => setOnboarding(prev => ({ ...prev, solanaAddress: undefined }))}
                  />

                  <div className="flex flex-col gap-3">
                    <Button variant="gradient" size="xl" className="w-full" onClick={() => setCurrentStep(3)}>
                      {onboarding.solanaAddress ? "Linked! Continue" : "Skip & Continue"}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                    <Button variant="ghost" onClick={goBack} className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to EVM
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Your Profile */}
            {currentStep === 3 && (
              <Card variant="glass" className="p-8 border-primary/20 bg-[#0a0a0b] border-t-2 border-t-primary/40">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="text-4xl font-bold mb-4">Your Profile</CardTitle>
                  <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                    Tell us how you plan to use Velora ID. This determines your eligibility products.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-8">
                  {/* Display Name */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Display Name
                    </label>
                    <Input 
                      placeholder="e.g. Alex Chen"
                      value={onboarding.displayName}
                      onChange={(e) => setOnboarding(prev => ({ ...prev, displayName: e.target.value }))}
                      className="h-14 bg-background/20 border-white/5 text-lg font-medium px-6 rounded-2xl focus:ring-primary/20"
                    />
                  </div>

                  {/* Profile Type Selection */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      I am a...
                    </label>
                    <div className="grid gap-4">
                      {PROFILE_TYPES.map((p) => (
                        <div 
                          key={p.type} 
                          onClick={() => selectProfile(p.type)}
                          className={cn(
                            "group cursor-pointer p-6 rounded-3xl border transition-all duration-300 flex items-center gap-6",
                            onboarding.profileType === p.type 
                              ? "bg-primary/5 border-primary/40" 
                              : "bg-background/20 border-white/5 hover:border-white/10"
                          )}
                        >
                          <div className={cn(
                            "h-14 w-14 rounded-2xl flex items-center justify-center transition-colors",
                            onboarding.profileType === p.type ? "bg-primary/20" : "bg-white/5"
                          )}>
                            <p.icon className={cn(
                              "h-6 w-6",
                              onboarding.profileType === p.type ? "text-primary" : "text-muted-foreground"
                            )} />
                          </div>
                          <div className="flex-1">
                            <h3 className={cn(
                              "text-xl font-bold mb-1",
                              onboarding.profileType === p.type ? "text-foreground" : "text-muted-foreground"
                            )}>{p.title}</h3>
                            <p className="text-sm text-muted-foreground/60 leading-snug">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button 
                      variant="outline" 
                      size="xl" 
                      onClick={goBack} 
                      className="px-10 bg-transparent border-white/10 hover:bg-white/5 font-normal rounded-2xl"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      variant="gradient" 
                      size="xl" 
                      className="flex-1 font-semibold text-lg rounded-2xl h-16" 
                      disabled={!onboarding.profileType || !onboarding.displayName}
                      onClick={() => setCurrentStep(4)}
                    >
                      Business Details
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: HashKey KYC Verification */}
            {currentStep === 4 && (
              <Card variant="glass" className="text-center p-6 border-primary/20">
                <CardHeader>
                  <div className="h-20 w-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">HashKey Identity Proof</CardTitle>
                  <CardDescription className="text-base px-8">
                    Velora ID uses HashKey Chain's native KYC SBT to verify your identity privately.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {!onboarding.nexaIdCompleted ? (
                    <div className="space-y-4">
                      {kycInfo && !kycInfo.isApproved && (
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-500 mb-4">
                          No approved KYC found for this address. Please visit the HashKey KYC portal to verify.
                        </div>
                      )}
                      
                      <Button variant="gradient" size="xl" className="w-full" onClick={checkHashKeyKyc} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            Checking HashKey Chain...
                          </>
                        ) : "Check KYC Status"}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground">
                        Don't have KYC? <a href="https://hashfans.io" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verify on HashFans</a>
                      </p>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center animate-in zoom-in-95 duration-300">
                      <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
                      <p className="text-xl font-bold text-green-400">Identity Verified</p>
                      <p className="text-sm text-green-400/60 mt-2">Level {kycInfo?.level}: {kycInfo?.level === 2 ? 'Advanced' : 'Basic'}</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {onboarding.nexaIdCompleted && (
                       <Button variant="outline" className="w-full" onClick={() => setCurrentStep(5)}>
                         Continue to Reputation Scan
                       </Button>
                    )}
                    <Button variant="ghost" onClick={goBack} className="text-muted-foreground h-12">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Scanning Activity */}
            {currentStep === 5 && (
              <Card variant="glass" className="text-center p-8 border-primary/20">
                <CardHeader>
                  <div className="h-24 w-24 mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold">Scanning Reputation</CardTitle>
                  <CardDescription className="text-lg">
                    Analyzing activity on HashKey, Base, Ethereum, BSC{onboarding.solanaAddress && ", and Solana"}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="grid grid-cols-5 gap-2 mb-10">
                    {["ETH", "BASE", "ARB", "BSC", "SOL"].map((chain) => (
                      <div 
                        key={chain} 
                        className={cn(
                          "h-1.5 rounded-full",
                          isLoading ? "bg-primary/20 overflow-hidden" : "bg-primary"
                        )}
                      >
                        {isLoading && (
                          <motion.div 
                            className="h-full bg-primary" 
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {!onboarding.eligibilityCalculated ? (
                    <Button variant="gradient" size="xl" className="w-full h-14" onClick={calculateUserEligibility} disabled={isLoading}>
                      {isLoading ? "Running Aggregation..." : "Kickoff Real-Time Analysis"}
                    </Button>
                  ) : (
                    <Button variant="gradient" size="xl" className="w-full" onClick={() => setCurrentStep(6)}>
                      View Result
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 6: Result Review */}
            {currentStep === 6 && eligibilityResult && (
              <Card variant="glass" className="p-8 border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                  <Badge variant="verified" className="px-3 py-1 text-sm font-bold">50:50 Hybrid Trust</Badge>
                </div>
                
                <CardHeader className="text-center">
                  <div className="h-20 w-20 mx-auto mb-6 rounded-3xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <Sparkles className="h-10 w-10 text-green-500" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Protocol Adjusted Score</CardTitle>
                  <CardDescription className="text-base px-8">
                    Your global reputation has been normalized for HashKey Chain.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-8 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 text-center">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Trust Score</p>
                      <p className="text-5xl font-black text-primary">{eligibilityResult.trustScore}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-secondary/5 border border-white/5 text-center flex flex-col justify-center">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Network Risk</p>
                      <Badge className="mx-auto" variant={eligibilityResult.riskTier === "low" ? "success" : "warning"}>
                        {eligibilityResult.riskTier.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-sm font-bold opacity-70">MAX {onboarding.profileType?.toUpperCase()} LIMIT</p>
                       <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-3xl font-black text-foreground">
                      {formatCurrency(eligibilityResult.creatorAdvanceLimit || eligibilityResult.merchantFinanceLimit || eligibilityResult.defiBorrowLimit)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Score Drivers</h4>
                    {eligibilityResult.factors.map(f => (
                       <div key={f.name} className="flex justify-between items-center p-3 rounded-xl bg-background/40 text-sm">
                         <span>{f.name}</span>
                         <span className="font-bold text-primary">+{f.score}</span>
                       </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Link href="/dashboard">
                      <Button variant="gradient" size="xl" className="w-full h-14">
                        Secure Access to Dashboard
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
