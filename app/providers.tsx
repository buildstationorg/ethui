'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  // mainnet,
  sepolia,
  // base,
  baseSepolia,
  // arbitrum,
  arbitrumSepolia,
  // unichainSepolia,
  unichainSepolia,
  kaia,
  kairos,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http, createConfig } from 'wagmi';
// import { injected, metaMask, coinbaseWallet, safe, walletConnect } from 'wagmi/connectors'
import { Provider as JotaiProvider } from 'jotai';
// import according to docs

export const localConfig = createConfig({
  chains: [
    // mainnet,
    sepolia,
    // base,
    baseSepolia,
    // arbitrum,
    arbitrumSepolia,
    // unichainSepolia,
    unichainSepolia,
    kaia,
    kairos
  ],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
    // [base.id]: http(),
    [baseSepolia.id]: http(),
    // [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    // [unichainSepolia.id]: http(),
    [unichainSepolia.id]: http(),
    [kaia.id]: http(),
    [kairos.id]: http(),
  },
  ssr: true,
});

// initialize and destructure wallets object

// const projectId = '4677fc7e8805e5823c3ea097ee4f08a8'

// const config = createConfig({
//   chains: [sepolia, baseSepolia, arbitrumSepolia, kairos],
//   connectors: [
//     injected(),
//     coinbaseWallet({ appName: 'EthUI' }),
//     walletConnect({ projectId }),
//     metaMask(),
//     safe(),
//   ],
//   transports: {
//     [sepolia.id]: http(),
//     [baseSepolia.id]: http(),
//     [arbitrumSepolia.id]: http(),
//     [kairos.id]: http(),
//   },
//   ssr: true,
// })

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "EthUI", // Name your app
  projectId: "4677fc7e8805e5823c3ea097ee4f08a8", // Enter your WalletConnect Project ID here
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [
    sepolia,
    baseSepolia,
    arbitrumSepolia,
    kaia,
    kairos,
  ],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [kaia.id]: http(),
    [kairos.id]: http(),
  },
  ssr: true, // Because it is Nextjs's App router, you need to declare ssr as true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
