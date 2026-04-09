"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileCheck,
  Shield,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, shortenAddress } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function VerifierPage() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [filter, setFilter] = useState<string>("all");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (applicationId: string, status: string) => {
    setProcessing(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          applicantId: selectedApplicant.userId,
          profileType: "creator", // Mock for demo
          eligibility: selectedApplicant.eligibilitySnapshot || { trustScore: 78, riskTier: "low", factors: [] },
          requestedAmount: selectedApplicant.amount
        })
      });

      if (res.ok) {
        toast({
          title: `Application ${status === "approved" ? "Approved" : "Rejected"}`,
          description: `Decision processed successfully with AI risk report generation.`,
        });
        const updated = await res.json();
        setSelectedApplicant(updated);
        fetchApplications();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process decision.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="pending">Pending</Badge>;
      case "approved":
        return <Badge variant="verified">Approved</Badge>;
      case "rejected":
        return <Badge variant="failed">Rejected</Badge>;
      case "manual_review":
        return <Badge variant="warning">Manual Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredApplicants = applications.filter((a: any) => {
     if (filter === "all") return true;
     return a.status === filter;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a: any) => a.status === "pending").length,
    approved: applications.filter((a: any) => a.status === "approved").length,
    rejected: applications.filter((a: any) => a.status === "rejected").length,
  };

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
           <p className="text-muted-foreground">Loading institutional dashboard...</p>
        </div>
     );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Verifier Dashboard</h1>
          <p className="text-muted-foreground">
            Review and process funding applications from verified users.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchApplications}>
           Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Total Applications</span>
            </div>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Pending Review</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">Approved</span>
            </div>
            <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Rejected</span>
            </div>
            <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Applicant List */}
        <div className="lg:col-span-2">
          <Card variant="glass">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Incoming Applications</CardTitle>
                <div className="flex items-center gap-2">
                  <Tabs value={filter} onValueChange={setFilter}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="approved">Approved</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredApplicants.length === 0 ? (
                 <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
                    <Users className="h-10 w-10 mx-auto mb-4 text-muted-foreground/30" />
                    <p className="text-muted-foreground">No applications found in this category.</p>
                 </div>
              ) : (
                <div className="space-y-3">
                   {filteredApplicants.map((applicant) => (
                     <div
                        key={applicant.id}
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedApplicant?.id === applicant.id
                           ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                           : "border-border bg-background/50 hover:border-primary/30"
                        }`}
                        onClick={() => setSelectedApplicant(applicant)}
                     >
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <p className="font-mono text-sm">
                                 {shortenAddress(applicant.user.evmAddress, 6)}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                 <Badge variant="outline" className="text-[10px] uppercase">
                                 {applicant.type.replace("_", " ")}
                                 </Badge>
                                 {getStatusBadge(applicant.status)}
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-bold">
                              {formatCurrency(applicant.amount)}
                           </p>
                           <p className="text-[10px] text-muted-foreground uppercase">
                              Score: {applicant.eligibilitySnapshot?.trustScore || "N/A"}
                           </p>
                        </div>
                        </div>
                     </div>
                   ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Applicant Detail */}
        <div>
          {selectedApplicant ? (
            <Card variant="glass" className="sticky top-20 border-primary/20 bg-primary/2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="h-4 w-4" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-background/80 border border-border">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">Applicant Wallet</p>
                  <p className="font-mono text-xs">
                    {selectedApplicant.user.evmAddress}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Product Type</p>
                    <p className="text-xs font-semibold capitalize">{selectedApplicant.type.replace("_", " ")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Requested</p>
                    <p className="text-xs font-bold text-primary">
                      {formatCurrency(selectedApplicant.amount)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Trust Signal Summary</p>
                  <div className="flex items-center gap-4">
                    <Progress
                      value={selectedApplicant.eligibilitySnapshot?.trustScore || 0}
                      className="flex-1 h-1.5"
                    />
                    <span className="text-xs font-bold">
                      {selectedApplicant.eligibilitySnapshot?.trustScore || "???"}/100
                    </span>
                  </div>
                </div>

                {selectedApplicant.aiReview ? (
                   <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 text-primary">
                         <Sparkles className="h-4 w-4" />
                         <span className="text-xs font-bold uppercase tracking-widest">AI Institutional Report</span>
                      </div>
                      <p className="text-xs italic leading-relaxed">"{selectedApplicant.aiReview.summary}"</p>
                      <div className="space-y-2">
                         <p className="text-[10px] uppercase font-bold text-muted-foreground">Positive Signals</p>
                         <ul className="text-[10px] space-y-1">
                            {selectedApplicant.aiReview.positiveFactors.map((f: string, i: number) => (
                               <li key={i} className="flex items-center gap-1 text-green-500">
                                  <CheckCircle2 className="h-3 w-3" /> {f}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div className="pt-2 border-t border-border">
                         <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Verification Safeguards</p>
                         <p className="text-[10px] text-muted-foreground">{selectedApplicant.aiReview.recommendations[0]}</p>
                      </div>
                   </div>
                ) : (
                   <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10 flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <p className="text-[10px] text-yellow-500/80">Pending AI investigation. Approval will trigger the institutional risk underwriting agent.</p>
                   </div>
                )}

                {selectedApplicant.status === "pending" ? (
                  <div className="flex flex-col gap-2 pt-4">
                    <Button 
                        variant="gradient" 
                        className="w-full h-10 text-xs"
                        onClick={() => handleDecision(selectedApplicant.id, "approved")}
                        disabled={processing}
                    >
                      {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                      Finalize & Approve
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full text-xs text-destructive hover:bg-destructive/5"
                        onClick={() => handleDecision(selectedApplicant.id, "rejected")}
                        disabled={processing}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 text-center">
                     <p className="text-xs text-green-500 font-medium">Decision Processed: {selectedApplicant.status.toUpperCase()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card variant="glass" className="sticky top-20 border-dashed border-2">
              <CardContent className="pt-6">
                <div className="text-center py-20 text-muted-foreground">
                  <Eye className="h-10 w-10 mx-auto mb-4 opacity-10" />
                  <p className="text-sm">Select an application to view signals</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
