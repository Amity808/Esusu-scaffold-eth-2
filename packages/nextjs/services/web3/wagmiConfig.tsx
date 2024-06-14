import { wagmiConnectors } from "./wagmiConnectors";
import { Chain, createClient, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import { createConfig } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";
import { coinbaseWallet } from 'wagmi/connectors'

const { targetNetworks } = scaffoldConfig;

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


// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
