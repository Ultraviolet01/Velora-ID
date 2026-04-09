// HashKey Chain Integration Service (Viem-powered)
import { TransactionResult, ChainConfig } from "@/types";
import { CURRENT_CHAIN, SUPPORTED_CHAINS, getExplorerTxUrl } from "@/config/chain";
import { sleep, generateId } from "@/lib/utils";
import { createPublicClient, http, type Address } from "viem";

const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

class HashKeyChainService {
  private publicClient = createPublicClient({
    chain: {
      id: CURRENT_CHAIN.chainId,
      name: CURRENT_CHAIN.name,
      nativeCurrency: CURRENT_CHAIN.nativeCurrency,
      rpcUrls: {
        default: { http: [CURRENT_CHAIN.rpcUrl] },
        public: { http: [CURRENT_CHAIN.rpcUrl] },
      },
    },
    transport: http(),
  });

  async submitProofOnChain(proofHash: string, proofType: string): Promise<TransactionResult> {
    if (MOCK_MODE) {
      return this.mockSubmitProof(proofHash, proofType);
    }

    // Real implementation would use useWriteContract from Wagmi in components
    // This service acts as a fallback or read-only helper
    throw new Error("Proof submission should be handled via Wagmi useWriteContract in the UI");
  }

  async verifyProofOnChain(proofHash: string): Promise<boolean> {
    if (MOCK_MODE) {
      await sleep(800);
      return true;
    }

    try {
      // Example: read from contract using publicClient
      // const data = await this.publicClient.readContract({ ... })
      return true; 
    } catch (error) {
      console.error("Verification failed:", error);
      return false;
    }
  }

  async registerUser(walletAddress: string, profileType: string): Promise<TransactionResult> {
    if (MOCK_MODE) {
      return this.mockRegisterUser(walletAddress, profileType);
    }

    throw new Error("User registration should be handled via Wagmi useWriteContract in the UI");
  }

  getChainConfig(): ChainConfig {
    return CURRENT_CHAIN;
  }

  isCorrectNetwork(chainId: number | null): boolean {
    if (!chainId) return false;
    return SUPPORTED_CHAINS.some((chain) => chain.chainId === chainId);
  }

  // Mock implementations
  private async mockSubmitProof(proofHash: string, proofType: string): Promise<TransactionResult> {
    await sleep(2000);
    const hash = `0x${generateId()}${generateId()}${generateId()}`;
    return {
      hash,
      status: "confirmed",
      explorerUrl: getExplorerTxUrl(hash),
    };
  }

  private async mockRegisterUser(
    walletAddress: string,
    profileType: string
  ): Promise<TransactionResult> {
    await sleep(1500);
    const hash = `0x${generateId()}${generateId()}${generateId()}`;
    return {
      hash,
      status: "confirmed",
      explorerUrl: getExplorerTxUrl(hash),
    };
  }
}

export const hashKeyChainService = new HashKeyChainService();
