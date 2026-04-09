"use client";

import {
  TrendingUp,
  Calendar,
  DollarSign,
  Info,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Loader2,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getDemoScenario } from "@/data/demo";
import { useToast } from "@/hooks/use-toast";

export default function CreatorPage() {
  const { toast } = useToast();
  const scenario = getDemoScenario("approved-creator")!;
  const { eligibility, profile } = scenario;
  const profileData = profile.profileData as { monthlyInflow: number; paymentFrequency: string };

  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFunding, setActiveFunding] = useState<any>(null);
  const [pendingApplication, setPendingApplication] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f5aB12";

  const maxAdvance = eligibility.creatorAdvanceLimit;
  const suggestedAdvance = Math.round(maxAdvance * 0.6);
  const feePercentage = 5;
  const repaymentDays = 90;

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user?address=${walletAddress}`);
      const userData = await res.json();
      
      if (userData.id) {
        const appRes = await fetch(`/api/applications?userId=${userData.id}`);
        const apps = await appRes.json();
        const pending = apps.find((a: any) => a.status === "pending" || a.status === "manual_review");
        setPendingApplication(pending);

        // Fetch active funding (we'll implement this endpoint next)
        const fundingRes = await fetch(`/api/funding/active?userId=${userData.id}`);
        if (fundingRes.ok) {
          const funding = await fundingRes.json();
          setActiveFunding(funding);
        }
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAdvance = async (amount: number) => {
    setSubmitting(true);
    try {
      const userRes = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress })
      });
      const user = await userRes.json();

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          type: "creator_advance",
          amount: amount
        })
      });

      if (res.ok) {
        toast({
          title: "Application Submitted",
          description: "Your advance request has been sent for institutional review.",
        });
        fetchStatus();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRepay = async () => {
    if (!activeFunding) return;
    setSubmitting(true);
    try {
      const repayAmount = Math.min(suggestedAdvance * 0.25, activeFunding.remainingBalance);
      const res = await fetch("/api/repayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: activeFunding.userId,
          fundingId: activeFunding.id,
          amount: repayAmount,
          txHash: "0x" + Math.random().toString(16).slice(2)
        })
      });

      if (res.ok) {
        toast({
          title: "Repayment Successful",
          description: `You have successfully repaid ${formatCurrency(repayAmount)}.`,
        });
        fetchStatus();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Repayment failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Syncing your financial profiles...</p>
      </div>
    );
  }

  const repaymentSchedule = [
    { date: "Week 4", amount: suggestedAdvance * 0.25, status: "pending" },
    { date: "Week 8", amount: suggestedAdvance * 0.25, status: "pending" },
    { date: "Week 12", amount: suggestedAdvance * 0.25, status: "pending" },
    { date: "Week 16", amount: suggestedAdvance * 0.25 + (suggestedAdvance * feePercentage / 100), status: "pending" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Creator Advance</h1>
          <p className="text-muted-foreground">
            Unlock cash advances based on your verified creator income.
          </p>
        </div>
        <Badge variant="gold" className="w-fit">
          Gold Trust • {eligibility.trustScore}/100
        </Badge>
      </div>

      {pendingApplication && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500/20">
                <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
              </div>
              <div>
                <p className="font-medium">Application Under Review</p>
                <p className="text-sm text-muted-foreground">
                  Your request for {formatCurrency(pendingApplication.amount)} is being reviewed by the AI institutional risk agent.
                </p>
              </div>
            </div>
            <Badge variant="warning">Pending</Badge>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">Monthly Inflow</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(profileData.monthlyInflow)}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Frequency</span>
            </div>
            <p className="text-2xl font-bold capitalize">{profileData.paymentFrequency}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Risk Tier</span>
            </div>
            <Badge variant="success" className="text-lg px-3 py-1">Low Risk</Badge>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Verification</span>
            </div>
            <Badge variant="verified" className="text-lg px-3 py-1">Verified</Badge>
          </CardContent>
        </Card>
      </div>

      {activeFunding ? (
        <Card variant="gradient" glow className="border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Active Creator Advance</CardTitle>
                <CardDescription>Track your current funding and repayments</CardDescription>
              </div>
              <Badge variant="gold">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-4xl font-bold text-primary">{formatCurrency(activeFunding.remainingBalance)}</p>
                <div className="pt-2">
                   <Progress value={(1 - activeFunding.remainingBalance / activeFunding.principal) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Original Advance</p>
                <p className="text-2xl font-semibold">{formatCurrency(activeFunding.principal)}</p>
                <p className="text-sm text-muted-foreground">90-day term @ 5% fee</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Next Payment Due</p>
                <p className="text-2xl font-semibold">15 APR 2026</p>
                <p className="text-sm text-muted-foreground">Scheduled: {formatCurrency(suggestedAdvance * 0.25)}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="gradient" 
                size="lg" 
                className="flex-1"
                onClick={handleRepay}
                disabled={submitting}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <DollarSign className="h-4 w-4 mr-2" />}
                Make Repayment
              </Button>
              <Button variant="outline" size="lg">Auto-Repay Settings</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card variant="gradient" glow>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Your Advance Eligibility</CardTitle>
              <Badge variant="verified">Eligible</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Maximum Available</p>
                <p className="text-5xl font-bold text-primary mb-4">
                  {formatCurrency(maxAdvance)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on 2.5x monthly inflow multiplier
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Suggested Amount</span>
                    <span className="font-semibold">{formatCurrency(suggestedAdvance)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Fee ({feePercentage}%)</span>
                    <span className="font-semibold">{formatCurrency(suggestedAdvance * feePercentage / 100)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Repayment Period</span>
                    <span className="font-semibold">{repaymentDays} days</span>
                  </div>
                  <hr className="my-3 border-border" />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Repayment</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(suggestedAdvance + (suggestedAdvance * feePercentage / 100))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="gradient" 
                size="lg" 
                className="flex-1 text-base h-12"
                onClick={() => handleAcceptAdvance(suggestedAdvance)}
                disabled={submitting || !!pendingApplication}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
                Accept Advance Offer
              </Button>
              <Button variant="outline" size="lg" className="h-12">
                Customize Amount
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Repayment Schedule */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Repayment Schedule</CardTitle>
          <CardDescription>Scheduled installments based on your bi-weekly pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {repaymentSchedule.map((payment, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{payment.date}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Installment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-sm">{formatCurrency(payment.amount)}</p>
                  {activeFunding && (activeFunding.principal - activeFunding.remainingBalance) >= (suggestedAdvance * 0.25 * (i + 1)) ? (
                    <Badge variant="verified" className="text-[10px]">Paid</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">Upcoming</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {activeFunding && activeFunding.application?.aiReview && (
        <Card variant="glass" className="border-primary/20 bg-primary/5">
          <CardHeader>
             <div className="flex items-center gap-2 text-primary">
                <Shield className="h-5 w-5" />
                <CardTitle className="text-sm">Risk Underwriting Assessment</CardTitle>
             </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 rounded-lg bg-background/50 italic text-sm border-l-2 border-primary">
                "{activeFunding.application.aiReview.summary}"
             </div>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Key Strengths</p>
                   <ul className="text-xs space-y-1">
                      {activeFunding.application.aiReview.positiveFactors.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-green-400">
                           <CheckCircle2 className="h-3 w-3" /> {f}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">AI Safeguards</p>
                   <p className="text-xs leading-relaxed text-muted-foreground italic">
                      {activeFunding.application.aiReview.recommendations[0]}
                   </p>
                </div>
             </div>
          </CardContent>
        </Card>
      )}

      {/* AI Explanation Toggle */}
      <Card variant="glass">
        <CardHeader>
          <button
            className="flex items-center justify-between w-full"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-base text-left">Why This Limit?</CardTitle>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${showExplanation ? "rotate-180" : ""}`}
            />
          </button>
        </CardHeader>
        {showExplanation && (
          <CardContent className="space-y-4 pt-0">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-xs leading-relaxed">
                You qualify for up to <span className="font-bold text-green-400">{formatCurrency(maxAdvance)}</span> based on your verified monthly inflow. Your <span className="text-primary font-bold">Gold Trust</span> status enables a 2.5x multiplier.
              </p>
            </div>
            <div className="space-y-3">
               <p className="text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" /> Positive Signals
               </p>
               <ul className="space-y-2 text-xs text-muted-foreground pl-5 list-disc">
                 <li>Verified creator identity through Nexa ID (+25 pts)</li>
                 <li>Consistent payment pattern from platforms (+18 pts)</li>
                 <li>3+ years of active creation history (+15 pts)</li>
               </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
