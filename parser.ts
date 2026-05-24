import { Character } from "../types/character";

export function parseSelection(
  message: string,
  characters: Character[]
): Character | null {
  const lower = message.toLowerCase().trim();

  // Numeric selection
  const numMatch = lower.match(/\b([1-3])\b/);
  if (numMatch) {
    const index = parseInt(numMatch[1], 10) - 1;
    return characters[index] ?? null;
  }

  // Ordinal words — all regex-based for consistency
  if (/\b(third|three|last)\b/.test(lower)) return characters[2] ?? null;
  if (/\b(second|two)\b/.test(lower)) return characters[1] ?? null;
  if (/\b(first|one)\b/.test(lower)) return characters[0] ?? null;

  // Name-based match (partial, case-insensitive)
  return characters.find((c) => lower.includes(c.name.toLowerCase())) ?? null;
}

// Word-boundary regex prevents false positives from words like "why" or "reply"
export function parseConfirmation(message: string): boolean | null {
  const lower = message.toLowerCase().trim();

  const yesRegex = /\b(yes|confirm|do it|execute|approved|yep|sure|yeah|y)\b/;
  const noRegex = /\b(no|cancel|decline|stop|nope|nah|n|abort)\b/;

  if (yesRegex.test(lower)) return true;
  if (noRegex.test(lower)) return false;
  return null;
}

export function parseBrowseIntent(message: string): boolean {
  const lower = message.toLowerCase();
  const triggers = [
    "show", "browse", "collection", "drop", "art", "gallery",
    "see", "view", "what do you have", "new drop", "refresh", "more",
  ];
  return triggers.some((t) => lower.includes(t));
}
