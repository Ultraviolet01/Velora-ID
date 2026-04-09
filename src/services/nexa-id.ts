// Nexa ID Service - Mock implementation for hackathon demo
import { NexaIdProof, ProofType, ProofStatus } from "@/types";
import { generateId, sleep } from "@/lib/utils";

const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

export interface NexaIdVerificationRequest {
  walletAddress: string;
  proofTypes: ProofType[];
}

export interface NexaIdVerificationResult {
  success: boolean;
  proofs: NexaIdProof[];
  error?: string;
}

// Proof type display names
export const PROOF_TYPE_LABELS: Record<ProofType, string> = {
  identity_verification: "Identity Verification",
  wallet_ownership: "Wallet Ownership",
  income_verification: "Income Verification",
  activity_consistency: "Activity Consistency",
  repayment_history: "Repayment History",
  collateral_proof: "Collateral Proof",
};

export const PROOF_TYPE_DESCRIPTIONS: Record<ProofType, string> = {
  identity_verification: "Verifies your identity without revealing personal data",
  wallet_ownership: "Proves ownership of your connected wallet",
  income_verification: "Validates income/revenue streams privately",
  activity_consistency: "Attests to consistent on-chain activity patterns",
  repayment_history: "Proves historical repayment reliability",
  collateral_proof: "Verifies available collateral holdings",
};

class NexaIdService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_NEXA_ID_ENDPOINT || "https://mock-nexa-id.velora.dev";
  }

  async startVerification(request: NexaIdVerificationRequest): Promise<NexaIdVerificationResult> {
    if (MOCK_MODE) {
      return this.mockStartVerification(request);
    }
    // Real implementation would call Nexa ID API here
    throw new Error("Real Nexa ID integration not yet implemented");
  }

  async checkProofStatus(proofId: string): Promise<NexaIdProof | null> {
    if (MOCK_MODE) {
      return this.mockCheckProofStatus(proofId);
    }
    throw new Error("Real Nexa ID integration not yet implemented");
  }

  async verifyProof(proofHash: string): Promise<boolean> {
    if (MOCK_MODE) {
      await sleep(500);
      return true;
    }
    throw new Error("Real Nexa ID integration not yet implemented");
  }

  // Mock implementations for demo
  private async mockStartVerification(request: NexaIdVerificationRequest): Promise<NexaIdVerificationResult> {
    await sleep(1500); // Simulate network delay

    const proofs: NexaIdProof[] = request.proofTypes.map((proofType) => ({
      id: generateId(),
      proofType,
      status: "verified" as ProofStatus,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      proofHash: `0x${generateId()}${generateId()}${generateId()}`,
      attestationData: {
        walletAddress: request.walletAddress,
        verificationMethod: "nexa-id-v1",
        confidenceLevel: 0.95,
      },
      verifiedAt: new Date().toISOString(),
    }));

    return { success: true, proofs };
  }

  private async mockCheckProofStatus(proofId: string): Promise<NexaIdProof | null> {
    await sleep(300);
    return {
      id: proofId,
      proofType: "identity_verification",
      status: "verified",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      proofHash: `0x${generateId()}`,
      attestationData: {},
      verifiedAt: new Date().toISOString(),
    };
  }

  // Generate proof vault entries from proofs
  generateProofVaultEntries(proofs: NexaIdProof[]) {
    return proofs.map((proof) => ({
      id: proof.id,
      proofType: proof.proofType,
      displayName: PROOF_TYPE_LABELS[proof.proofType],
      description: PROOF_TYPE_DESCRIPTIONS[proof.proofType],
      status: proof.status,
      createdAt: proof.createdAt,
      expiresAt: proof.expiresAt,
      proofHash: proof.proofHash,
    }));
  }
}

export const nexaIdService = new NexaIdService();
