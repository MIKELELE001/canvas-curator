export type Rarity = "common" | "rare" | "mythic";

export interface Character {
  id: string;
  name: string;
  lore: string;
  visualDescription: string;
  rarity: Rarity;
  price: number;
}

export interface AgentResponse {
  message: string;
  characters?: Character[];
  txHash?: string;
  error?: string;
}
