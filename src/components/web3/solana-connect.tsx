"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Link as LinkIcon, Loader2, Wallet, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, shortenAddress } from "@/lib/utils";

interface SolanaConnectProps {
  onVerify: (address: string) => void;
  onClear: () => void;
}

export function SolanaConnect({ onVerify, onClear }: SolanaConnectProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const connectSolana = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      // Check for Phantom or other Solana providers
      const provider = (window as any).solana;

      if (!provider?.isPhantom && !provider?.isBackpack) {
        throw new Error("Solana wallet not found. Please install Phantom or Backpack.");
      }

      // Connect
      const resp = await provider.connect();
      const pubKey = resp.publicKey.toString();
      setAddress(pubKey);

      // Verify ownership via signature
      setIsVerifying(true);
      const message = `Verify Solana ownership for Velora ID: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");
      
      if (signedMessage) {
        setIsVerified(true);
        onVerify(pubKey);
      }
    } catch (err: any) {
      console.error("Solana connection failed:", err);
      setError(err.message || "Failed to connect Solana wallet");
    } finally {
      setIsConnecting(false);
      setIsVerifying(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsVerified(false);
    setError(null);
    onClear();
  };

  return (
    <div className="space-y-4">
      {!isVerified ? (
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-sm gap-2 border-dashed border-primary/30 hover:border-primary/60 bg-primary/5 h-14"
            onClick={connectSolana}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {isVerifying ? "Verifying Signature..." : "Connecting..."}
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5 text-purple-400" />
                Link Solana Address (Optional)
              </>
            )}
          </Button>
          {error && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              {error}
            </p>
          )}
          <p className="text-[10px] text-muted-foreground">
            Sign a message to prove ownership and boost your trust score.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-400">Solana Linked</p>
              <p className="text-sm font-mono text-muted-foreground">
                {shortenAddress(address!)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={disconnect} className="text-muted-foreground hover:text-foreground">
            Change
          </Button>
        </div>
      )}
    </div>
  );
}
