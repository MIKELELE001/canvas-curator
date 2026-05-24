import { randomUUID } from "crypto";
import { Character, Rarity } from "../types/character";
import { characterTemplates } from "../data/characterTemplates";
import { pointillismDescriptors, rarityDescriptors, rarityWeights } from "../data/artStyles";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function assignRarity(): Rarity {
  const roll = Math.random();
  if (roll < rarityWeights.mythic) return "mythic";
  if (roll < rarityWeights.mythic + rarityWeights.rare) return "rare";
  return "common";
}

// Rarity-driven pricing: common 0.1 / rare 0.5 / mythic 1.5 HBAR
const pricingMap: Record<Rarity, number> = {
  common: 0.1,
  rare: 0.5,
  mythic: 1.5,
};

function generateCharacter(usedArchetypes: Set<string>): Character {
  let archetype: string;
  let attempts = 0;
  do {
    archetype = pickRandom(characterTemplates.archetypes);
    attempts++;
  } while (usedArchetypes.has(archetype) && attempts < 20);
  usedArchetypes.add(archetype);

  const rarity = assignRarity();
  const palette = pickRandom(characterTemplates.colorPalettes);
  const background = pickRandom(characterTemplates.backgrounds);
  const accessory = pickRandom(characterTemplates.accessories);
  const style = pickRandom(pointillismDescriptors);
  const loreBase = pickRandom(characterTemplates.loreFragments);

  return {
    id: randomUUID(),
    name: archetype,
    lore: `${loreBase}, carrying ${accessory}.`,
    visualDescription: `${style}. Palette: ${palette}. Set against ${background}. ${rarityDescriptors[rarity]}`,
    rarity,
    price: pricingMap[rarity],
  };
}

export function generateCollection(): Character[] {
  const usedArchetypes = new Set<string>();
  return [
    generateCharacter(usedArchetypes),
    generateCharacter(usedArchetypes),
    generateCharacter(usedArchetypes),
  ];
}
