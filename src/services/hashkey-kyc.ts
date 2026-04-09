import { createPublicClient, http, type Address } from 'viem';
import { hashKeyTestnet } from '@/config/wagmi';
import { KYC_SBT_ADDRESS, KYC_SBT_ABI, KycLevel, KycStatus } from '@/lib/contracts/kyc-sbt';

const RPC_URL = process.env.NEXT_PUBLIC_HASHKEY_RPC_URL || 'https://testnet.hashkeychain.io';

class HashKeyKycService {
  private publicClient;

  constructor() {
    this.publicClient = createPublicClient({
      chain: hashKeyTestnet,
      transport: http(RPC_URL),
    });
  }

  /**
   * Checks if an address has passed the basic "human" verification.
   */
  async isHuman(address: Address): Promise<{ isHuman: boolean; level: number }> {
    try {
      const [isHuman, level] = await this.publicClient.readContract({
        address: KYC_SBT_ADDRESS as Address,
        abi: KYC_SBT_ABI,
        functionName: 'isHuman',
        args: [address],
      }) as [boolean, number];

      return { isHuman, level };
    } catch (error) {
      console.error('Error checking isHuman:', error);
      return { isHuman: false, level: 0 };
    }
  }

  /**
   * Fetches detailed KYC information for an address.
   */
  async getKycInfo(address: Address) {
    try {
      const [ensName, level, status, createTime] = await this.publicClient.readContract({
        address: KYC_SBT_ADDRESS as Address,
        abi: KYC_SBT_ABI,
        functionName: 'getKycInfo',
        args: [address],
      }) as [string, number, number, bigint];

      return {
        ensName,
        level: level as KycLevel,
        status: status as KycStatus,
        createTime: Number(createTime),
        isApproved: status === KycStatus.APPROVED,
      };
    } catch (error) {
      console.error('Error fetching KYC info:', error);
      return null;
    }
  }

  /**
   * Helper to check if a user is fully verified (Level 1 or 2 and Approved).
   */
  async isVerified(address: Address): Promise<boolean> {
    const info = await this.getKycInfo(address);
    if (!info) return false;
    return info.isApproved && info.level >= KycLevel.BASIC;
  }
}

export const hashKeyKycService = new HashKeyKycService();
