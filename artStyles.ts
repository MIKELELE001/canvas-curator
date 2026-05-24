export const pointillismDescriptors: string[] = [
  "constructed from thousands of individual color dots placed with surgical precision",
  "each feature rendered through dense clusters of stippled pigment that blur into form at distance",
  "the figure emerges from a field of chromatic points — impressionist in spirit, deliberate in execution",
  "shadow and light achieved not through blending but through the careful density of dot placement",
  "color theory expressed through adjacent points of pure hue, merging optically in the viewer's eye",
  "built from micro-clusters of pigment that argue with each other until they agree on a face",
];

export const rarityDescriptors: Record<string, string> = {
  common: "A clean, grounded piece. Fewer layers, quieter palette. Still carries weight.",
  rare: "Three distinct dot layers with intentional color tension. The kind of work you remember.",
  mythic: "Twelve layers deep. The dots argue until they agree on something beautiful. Judges notice these.",
};

export const rarityWeights = {
  mythic: 0.15,
  rare: 0.35,
  common: 0.50,
};
