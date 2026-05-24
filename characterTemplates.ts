export interface CharacterTemplate {
  archetypes: string[];
  loreFragments: string[];
  colorPalettes: string[];
  backgrounds: string[];
  accessories: string[];
}

export const characterTemplates: CharacterTemplate = {
  archetypes: [
    "The Wandering Cartographer",
    "The Dreamweaver Archivist",
    "The Tidebound Oracle",
    "The Ember Sentinel",
    "The Voidborn Merchant",
    "The Rootwalker Sage",
    "The Stormcaller Nomad",
    "The Gilded Illusionist",
    "The Hollow Crown Keeper",
    "The Prismatic Duelist",
    "The Ashborn Navigator",
    "The Fracture Witness",
  ],
  loreFragments: [
    "born at the edge of the known world, where maps end and myths begin",
    "keeper of forgotten languages spoken only in dreams",
    "said to have walked between worlds before the great fracture",
    "the last of an order that traded in memories rather than gold",
    "marked by a celestial event that occurs once every thousand years",
    "carries a burden no living soul was meant to carry alone",
    "their footsteps leave faint patterns of light on stone",
    "neither fully present nor absent, existing between breaths",
  ],
  colorPalettes: [
    "cobalt blue and burnt sienna with ivory highlights",
    "deep crimson and forest green with gold undertones",
    "violet and amber with pearl white accents",
    "slate grey and rust orange with pale yellow points",
    "midnight black and rose gold with silver dust",
    "emerald and terracotta with cream stippling",
  ],
  backgrounds: [
    "a dissolving cityscape made entirely of light points",
    "an ancient library where the books breathe",
    "a fractured sky stitched together with threads of stars",
    "a marketplace at the edge of two dimensions",
    "a mirror reflecting a world slightly different from ours",
  ],
  accessories: [
    "a compass that points toward secrets rather than north",
    "a cloak woven from compressed time",
    "eyes that hold reflections of places never visited",
    "hands that leave faint impressions of color on everything they touch",
    "a voice that sounds like two people speaking in unison",
  ],
};
