import { ChainConfig } from "@/types";

export const HASHKEY_TESTNET: ChainConfig = {
  chainId: 133,
  name: "HashKey Chain Testnet",
  rpcUrl: "https://testnet.hsk.xyz",
  explorerUrl: "https://testnet-explorer.hsk.xyz",
  nativeCurrency: {
    name: "HashKey",
    symbol: "HSK",
    decimals: 18,
  },
  contracts: {
    proofVault: "0x51896d422E51a5Bfc29defa439d5CA2927abA9cE",
    veloraRegistry: "0xcCd5C3f06335745d396e51C1AcC898D8C316fd5b",
  },
};

export const CURRENT_CHAIN = HASHKEY_TESTNET;
export const SUPPORTED_CHAINS = [HASHKEY_TESTNET];

export function getExplorerTxUrl(hash: string): string {
  return `${CURRENT_CHAIN.explorerUrl}/tx/${hash}`;
}

export function getExplorerAddressUrl(address: string): string {
  return `${CURRENT_CHAIN.explorerUrl}/address/${address}`;
}

export function isCorrectNetwork(chainId: number | null): boolean {
  if (!chainId) return false;
  return SUPPORTED_CHAINS.some((chain) => chain.chainId === chainId);
}
