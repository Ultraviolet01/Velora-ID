import { 
  connectorsForWallets, 
  RainbowKitProvider, 
  darkTheme 
} from "@rainbow-me/rainbowkit";
import { 
  injectedWallet, 
  metaMaskWallet, 
  walletConnectWallet, 
  rainbowWallet 
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { 
  sepolia, 
  polygonAmoy, 
  optimismSepolia, 
  arbitrumSepolia, 
  baseSepolia 
} from "wagmi/chains";

// Define HashKey Testnet as a custom chain
export const hashKeyTestnet = {
  id: 133,
  name: "HashKey Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "HashKey",
    symbol: "HSK",
  },
  rpcUrls: {
    default: { http: ["https://testnet.hsk.xyz"] },
    public: { http: ["https://testnet.hsk.xyz"] },
  },
  blockExplorers: {
    default: { name: "HashKeyScan", url: "https://testnet-explorer.hsk.xyz" },
  },
} as const;

const projectId = "YOUR_WALLET_CONNECT_PROJECT_ID";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [
        injectedWallet, // This will pick up HashPass via EIP-6963 or extension injection
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "Velora ID",
    projectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [
    hashKeyTestnet,
    sepolia,
    polygonAmoy,
    optimismSepolia,
    arbitrumSepolia,
    baseSepolia,
  ],
  transports: {
    [hashKeyTestnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [optimismSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});
