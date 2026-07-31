import { defineChain } from 'viem';

export const CUSTODIA_CONTRACT_ADDRESS = '0x62bb24bF96b52783146591398e783E5CA30e892f' as const;

export const WALLET_CONNECT_PROJECT_ID = 'd4f201659a13a36db0a35393094d026c';

export const giwaSepolia = defineChain({
  id: 91342,
  name: 'GIWA Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rpc.giwa.io'],
    },
    public: {
      http: ['https://sepolia-rpc.giwa.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'GIWA Sepolia Explorer',
      url: 'https://sepolia-explorer.giwa.io',
    },
  },
  testnet: true,
});
