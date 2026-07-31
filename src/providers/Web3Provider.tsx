import React, { ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { giwaSepolia, WALLET_CONNECT_PROJECT_ID } from '../constants/network';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: false,
    },
    mutations: {
      retry: false,
      throwOnError: false,
    },
  },
});

export const wagmiConfig = getDefaultConfig({
  appName: 'Custodia',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [giwaSepolia],
  ssr: false,
});

const custodiaTheme = lightTheme({
  accentColor: '#b94a2c',
  accentColorForeground: '#ffffff',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            ...custodiaTheme,
            colors: {
              ...custodiaTheme.colors,
              modalBackground: '#fff8f4',
              modalBorder: '#d1c5b2',
              profileAction: '#ede1cd',
              profileActionHover: '#eadeca',
            },
          }}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
