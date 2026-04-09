"use client";

import {
  Shield,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDefaultDemoScenario } from "@/data/demo";
import { PROOF_TYPE_LABELS, PROOF_TYPE_DESCRIPTIONS } from "@/services/nexa-id";
import { shortenAddress } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function ProofVaultPage() {
  const scenario = getDefaultDemoScenario();
  const { proofs } = scenario;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Proof hash copied to clipboard",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="verified">Verified</Badge>;
      case "pending":
        return <Badge variant="pending">Pending</Badge>;
      case "failed":
        return <Badge variant="failed">Failed</Badge>;
      case "expired":
        return <Badge variant="warning">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Proof Vault</h1>
          <p className="text-muted-foreground">
            Your Nexa ID proofs and attestations stored securely on HashKey Chain.
          </p>
        </div>
        <Button variant="outline" className="w-fit">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Proofs
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <FileCheck className="h-4 w-4" />
              <span className="text-sm">Total Proofs</span>
            </div>
            <p className="text-3xl font-bold">{proofs.length}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">Verified</span>
            </div>
            <p className="text-3xl font-bold text-green-500">
              {proofs.filter((p) => p.status === "verified").length}
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Pending</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">
              {proofs.filter((p) => p.status === "pending").length}
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Expired</span>
            </div>
            <p className="text-3xl font-bold text-red-500">
              {proofs.filter((p) => p.status === "expired").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Proof List */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Your Proofs
          </CardTitle>
          <CardDescription>
            Privacy-preserving proofs generated through Nexa ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proofs.map((proof) => (
              <div
                key={proof.id}
                className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">
                          {PROOF_TYPE_LABELS[proof.proofType]}
                        </p>
                        {getStatusBadge(proof.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {PROOF_TYPE_DESCRIPTIONS[proof.proofType]}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>
                          Created: {new Date(proof.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                          Expires: {new Date(proof.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4 hidden md:block">
                      <p className="text-xs text-muted-foreground mb-1">Proof Hash</p>
                      <p className="font-mono text-sm">
                        {shortenAddress(proof.proofHash, 8)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(proof.proofHash)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate New Proofs */}
      <Card variant="gradient">
        <CardHeader>
          <CardTitle>Generate New Proofs</CardTitle>
          <CardDescription>
            Create additional proofs to strengthen your eligibility profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <p className="font-medium">Collateral Proof</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Prove your collateral holdings without revealing exact amounts.
              </p>
              <Button variant="outline" size="sm">
                Generate Proof
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <p className="font-medium">Repayment History</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Prove your on-time repayment history from connected protocols.
              </p>
              <Button variant="outline" size="sm">
                Generate Proof
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* On-Chain Registration */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>On-Chain Registration</CardTitle>
          <CardDescription>
            Your proofs are registered on HashKey Chain for verifier access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">All Proofs Registered</p>
                <p className="text-sm text-muted-foreground">
                  Verifiers can validate your proofs on-chain
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
