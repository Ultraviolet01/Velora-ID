import { CURRENT_CHAIN } from "@/config/chain";

export interface ChainActivity {
  chain: string;
  transactions: number;
  balance: string;
  firstSeen?: string;
  lastSeen?: string;
  active: boolean;
}

export interface MultiChainStats {
  evm: {
    address: string;
    chains: ChainActivity[];
    totalTransactions: number;
  };
  solana?: {
    address: string;
    transactions: number;
    balance: string;
    active: boolean;
    firstSeen?: string;
  };
  overall: {
    totalTxCount: number;
    activeChainsCount: number;
    earliestActivity: string | null;
  };
}

const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

class MultiChainService {
  private evmChains = [
    { id: "0x1", name: "ethereum" },
    { id: "0x2105", name: "base" },
    { id: "0xa4b1", name: "arbitrum" },
    { id: "0x38", name: "bsc" },
  ];

  async getMultiChainActivity(evmAddress: string, solanaAddress?: string): Promise<MultiChainStats> {
    if (!MORALIS_API_KEY) {
      console.warn("Moralis API Key is missing. Falling back to mock data.");
      return this.getMockActivity(evmAddress, solanaAddress);
    }

    try {
      const evmPromises = this.evmChains.map((chain) => this.fetchEvmChainStats(evmAddress, chain.id));
      const evmResults = await Promise.all(evmPromises);

      let solanaStats;
      if (solanaAddress) {
        solanaStats = await this.fetchSolanaStats(solanaAddress);
      }

      const totalTransactions = evmResults.reduce((sum, res) => sum + res.transactions, 0) + (solanaStats?.transactions || 0);
      const activeChainsCount = evmResults.filter(r => r.active).length + (solanaStats?.active ? 1 : 0);
      
      const allDates = [...evmResults.map(r => r.firstSeen), solanaStats?.firstSeen].filter(Boolean) as string[];
      const earliestActivity = allDates.length > 0 ? new Date(Math.min(...allDates.map(d => new Date(d).getTime()))).toISOString() : null;

      return {
        evm: {
          address: evmAddress,
          chains: evmResults,
          totalTransactions: evmResults.reduce((sum, res) => sum + res.transactions, 0),
        },
        solana: solanaStats ? {
          address: solanaAddress!,
          transactions: solanaStats.transactions,
          balance: solanaStats.balance,
          active: solanaStats.active,
          firstSeen: solanaStats.firstSeen,
        } : undefined,
        overall: {
          totalTxCount: totalTransactions,
          activeChainsCount,
          earliestActivity,
        },
      };
    } catch (error) {
      console.error("Multi-chain fetch failed:", error);
      return this.getMockActivity(evmAddress, solanaAddress);
    }
  }

  private async fetchEvmChainStats(address: string, chainId: string): Promise<ChainActivity> {
    try {
      // Fetch native balance
      const balanceRes = await fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/balance?chain=${chainId}`,
        { headers: { "X-API-Key": MORALIS_API_KEY! } }
      );
      const balanceData = await balanceRes.json();

      // Fetch transaction count (nonce/history summary)
      const historyRes = await fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=${chainId}&limit=1`,
        { headers: { "X-API-Key": MORALIS_API_KEY! } }
      );
      const historyData = await historyRes.json();

      const txCount = historyData.total || 0;
      
      return {
        chain: chainId,
        transactions: txCount,
        balance: balanceData.balance || "0",
        active: txCount > 0,
        firstSeen: historyData.result?.[0]?.block_timestamp,
      };
    } catch (e) {
      return { chain: chainId, transactions: 0, balance: "0", active: false };
    }
  }

  private async fetchSolanaStats(address: string) {
    try {
      const res = await fetch(
        `https://solana-gateway.moralis.io/account/mainnet/${address}/balance`,
        { headers: { "X-API-Key": MORALIS_API_KEY! } }
      );
      const data = await res.json();
      
      const txRes = await fetch(
        `https://solana-gateway.moralis.io/account/mainnet/${address}/transactions`,
        { headers: { "X-API-Key": MORALIS_API_KEY! } }
      );
      const txData = await txRes.json();

      return {
        transactions: txData.length || 0,
        balance: data.solana || "0",
        active: (txData.length || 0) > 0,
        firstSeen: txData[txData.length - 1]?.block_timestamp,
      };
    } catch (e) {
      return { transactions: 0, balance: "0", active: false };
    }
  }

  private getMockActivity(evmAddress: string, solanaAddress?: string): MultiChainStats {
    return {
      evm: {
        address: evmAddress,
        chains: [
          { chain: "ethereum", transactions: 45, balance: "1.2", active: true, firstSeen: "2023-01-15T10:00:00Z" },
          { chain: "base", transactions: 120, balance: "0.5", active: true, firstSeen: "2023-08-10T10:00:00Z" },
          { chain: "arbitrum", transactions: 80, balance: "0.8", active: true, firstSeen: "2023-05-20T10:00:00Z" },
          { chain: "bsc", transactions: 10, balance: "2.1", active: true, firstSeen: "2023-11-05T10:00:00Z" },
        ],
        totalTransactions: 255,
      },
      solana: solanaAddress ? {
        address: solanaAddress,
        transactions: 15,
        balance: "4.5",
        active: true,
        firstSeen: "2023-03-20T10:00:00Z",
      } : undefined,
      overall: {
        totalTxCount: 270,
        activeChainsCount: 5,
        earliestActivity: "2023-01-15T10:00:00Z",
      },
    };
  }
}

export const multiChainService = new MultiChainService();
