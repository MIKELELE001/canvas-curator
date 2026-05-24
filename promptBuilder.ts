import { Character } from "../types/character";

const DIVIDER = "━".repeat(42);

export function buildGalleryPrompt(characters: Character[]): string {
  const header = `🎨 THE CANVAS CURATOR — TODAY'S DROP\n${DIVIDER}`;

  const listings = characters.map((c, i) => {
    const emoji = c.rarity === "mythic" ? "✨" : c.rarity === "rare" ? "💎" : "🔵";
    return [
      `[${i + 1}] ${c.name}  ${emoji} ${c.rarity.toUpperCase()} — ${c.price} HBAR`,
      `    Lore: ${c.lore}`,
      `    Visual: ${c.visualDescription}`,
    ].join("\n");
  });

  const footer = `${DIVIDER}\nSelect a piece — reply with 1, 2, 3, or the character's name.`;
  return [header, ...listings, footer].join("\n\n");
}

export function buildConfirmationPrompt(character: Character): string {
  return [
    ``,
    `You've selected: ${character.name}`,
    `Rarity: ${character.rarity.toUpperCase()}`,
    `Price: ${character.price} HBAR (testnet)`,
    ``,
    `Confirm purchase? (yes / no)`,
  ].join("\n");
}

// Updated signature includes price for rarity-accurate receipts
export function buildReceiptMessage(
  txHash: string,
  characterName: string,
  price: number
): string {
  return [
    ``,
    `✅ PURCHASE CONFIRMED`,
    DIVIDER,
    `Character: ${characterName}`,
    `Amount: ${price} HBAR`,
    `Network: Hedera Testnet`,
    `TX Hash: ${txHash}`,
    `HCS: Purchase logged to Consensus Service.`,
    ``,
    `The piece is yours. The Curator will return.`,
  ].join("\n");
}
