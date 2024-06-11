import * as chains from "viem/chains";
// import { Chain } from '@wagmi/core'

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};
export const joc = {
  id: 10081,
  name: 'Japan Open Chain (Testnet)',
  network: 'Japan Open Chain (Testnet)',
  nativeCurrency: {
    decimals: 18,
    name: 'Japan Open Chain Testnet',
    symbol: 'JOC',
  },
  rpcUrls: {
    public: { http: ['https://rpc-2.testnet.japanopenchain.org:8545'] },
    default: { http: ['https://rpc-1.testnet.japanopenchain.org:8545'] },
  },
  blockExplorers: {
    etherscan: { name: 'Japan Open Chain (Testnet)', url: 'https://explorer.testnet.japanopenchain.org/' },
    default: { name: 'Japan Open Chain (Testnet)', url: 'https://explorer.testnet.japanopenchain.org/' },
  },
  contracts: {
    multicall3: {
      address: '0x914e5D06d4fc0856C09aE99d47B21124a3B4bC0B',
      // blockCreated: 11_907_934,
    },
  },
} 


const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [joc],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
