export interface WalletConfig {
  network: "testnet" | "mainnet";
  artistWalletId: string;
  hcsTopicId: string;
  purchaseAmount: number;
}

// Lazy-loaded getter — ensures env vars are populated before evaluation
export function getDefaultConfig(): WalletConfig {
  return {
    network: "testnet",
    artistWalletId: process.env.ARTIST_WALLET_ID ?? "",
    hcsTopicId: process.env.HCS_TOPIC_ID ?? "",
    purchaseAmount: 0.1,
  };
}
