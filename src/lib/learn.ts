import type {SolutionType} from "hodoku-ts";

export interface LearnDoc {
  slug: string;
  title: string;
}

export interface LearnRef {
  slug: string;
  frag: string;
}

// Ordered roughly by solving-technique difficulty, following the HoDoKu guide structure.
export const LEARN_DOCS: LearnDoc[] = [
  {slug: "tech_intro", title: "Introduction"},
  {slug: "tech_singles", title: "Singles"},
  {slug: "tech_intersections", title: "Intersections"},
  {slug: "tech_hidden", title: "Hidden Subsets"},
  {slug: "tech_naked", title: "Naked Subsets"},
  {slug: "tech_fishg", title: "Fish (General Explanation)"},
  {slug: "tech_fishb", title: "Basic Fish"},
  {slug: "tech_fishfs", title: "Finned/Sashimi Fish"},
  {slug: "tech_fishc", title: "Complex Fish"},
  {slug: "tech_sdp", title: "Single Digit Patterns"},
  {slug: "tech_wings", title: "Wings"},
  {slug: "tech_col", title: "Coloring"},
  {slug: "tech_chains", title: "Chains and Loops"},
  {slug: "tech_als", title: "ALS (Almost Locked Sets)"},
  {slug: "tech_ur", title: "Uniqueness"},
  {slug: "tech_last", title: "Last Resort"},
  {slug: "tech_misc", title: "Miscellaneous"},
];

const SLUGS = new Set(LEARN_DOCS.map((d) => d.slug));

export const isLearnSlug = (slug: string): boolean => SLUGS.has(slug);

// Maps a hodoku-ts technique to the guide section (doc slug + anchor) that explains it.
// Anchors come from the <span id="..."> markers in the markdown.
const TECHNIQUE_DOC: Partial<Record<SolutionType, LearnRef>> = {
  FULL_HOUSE: {slug: "tech_singles", frag: "fh"},
  NAKED_SINGLE: {slug: "tech_singles", frag: "n1"},
  HIDDEN_SINGLE: {slug: "tech_singles", frag: "h1"},

  LOCKED_PAIR: {slug: "tech_naked", frag: "n2l2"},
  LOCKED_TRIPLE: {slug: "tech_naked", frag: "n3l3"},
  LOCKED_CANDIDATES_1: {slug: "tech_intersections", frag: "lc1"},
  LOCKED_CANDIDATES_2: {slug: "tech_intersections", frag: "lc2"},

  NAKED_PAIR: {slug: "tech_naked", frag: "n2n2"},
  NAKED_TRIPLE: {slug: "tech_naked", frag: "n3n3"},
  NAKED_QUADRUPLE: {slug: "tech_naked", frag: "n4"},
  HIDDEN_PAIR: {slug: "tech_hidden", frag: "h2"},
  HIDDEN_TRIPLE: {slug: "tech_hidden", frag: "h3"},
  HIDDEN_QUADRUPLE: {slug: "tech_hidden", frag: "h4"},

  X_WING: {slug: "tech_fishb", frag: "bf2"},
  SWORDFISH: {slug: "tech_fishb", frag: "bf3"},
  JELLYFISH: {slug: "tech_fishb", frag: "bf4"},
  SQUIRMBAG: {slug: "tech_fishb", frag: "bf5"},
  WHALE: {slug: "tech_fishb", frag: "bf5"},
  LEVIATHAN: {slug: "tech_fishb", frag: "bf5"},

  FINNED_X_WING: {slug: "tech_fishfs", frag: "fbf2"},
  SASHIMI_X_WING: {slug: "tech_fishfs", frag: "fbf2"},
  FINNED_SWORDFISH: {slug: "tech_fishfs", frag: "fbf3"},
  SASHIMI_SWORDFISH: {slug: "tech_fishfs", frag: "fbf3"},
  FINNED_JELLYFISH: {slug: "tech_fishfs", frag: "fbf4"},
  SASHIMI_JELLYFISH: {slug: "tech_fishfs", frag: "fbf4"},
  FINNED_SQUIRMBAG: {slug: "tech_fishfs", frag: "fbf567"},
  SASHIMI_SQUIRMBAG: {slug: "tech_fishfs", frag: "fbf567"},
  FINNED_WHALE: {slug: "tech_fishfs", frag: "fbf567"},
  SASHIMI_WHALE: {slug: "tech_fishfs", frag: "fbf567"},
  FINNED_LEVIATHAN: {slug: "tech_fishfs", frag: "fbf567"},
  SASHIMI_LEVIATHAN: {slug: "tech_fishfs", frag: "fbf567"},

  FRANKEN_X_WING: {slug: "tech_fishc", frag: "ff"},
  FRANKEN_SWORDFISH: {slug: "tech_fishc", frag: "ff"},
  FRANKEN_JELLYFISH: {slug: "tech_fishc", frag: "ff"},
  FRANKEN_SQUIRMBAG: {slug: "tech_fishc", frag: "ff"},
  FRANKEN_WHALE: {slug: "tech_fishc", frag: "ff"},
  FRANKEN_LEVIATHAN: {slug: "tech_fishc", frag: "ff"},
  FINNED_FRANKEN_X_WING: {slug: "tech_fishc", frag: "ff"},
  FINNED_FRANKEN_SWORDFISH: {slug: "tech_fishc", frag: "ff"},
  FINNED_FRANKEN_JELLYFISH: {slug: "tech_fishc", frag: "ff"},
  FINNED_FRANKEN_SQUIRMBAG: {slug: "tech_fishc", frag: "ff"},
  FINNED_FRANKEN_WHALE: {slug: "tech_fishc", frag: "ff"},
  FINNED_FRANKEN_LEVIATHAN: {slug: "tech_fishc", frag: "ff"},
  MUTANT_X_WING: {slug: "tech_fishc", frag: "mf"},
  MUTANT_SWORDFISH: {slug: "tech_fishc", frag: "mf"},
  MUTANT_JELLYFISH: {slug: "tech_fishc", frag: "mf"},
  MUTANT_SQUIRMBAG: {slug: "tech_fishc", frag: "mf"},
  MUTANT_WHALE: {slug: "tech_fishc", frag: "mf"},
  MUTANT_LEVIATHAN: {slug: "tech_fishc", frag: "mf"},
  FINNED_MUTANT_X_WING: {slug: "tech_fishc", frag: "mf"},
  FINNED_MUTANT_SWORDFISH: {slug: "tech_fishc", frag: "mf"},
  FINNED_MUTANT_JELLYFISH: {slug: "tech_fishc", frag: "mf"},
  FINNED_MUTANT_SQUIRMBAG: {slug: "tech_fishc", frag: "mf"},
  FINNED_MUTANT_WHALE: {slug: "tech_fishc", frag: "mf"},
  FINNED_MUTANT_LEVIATHAN: {slug: "tech_fishc", frag: "mf"},

  SKYSCRAPER: {slug: "tech_sdp", frag: "sk"},
  TWO_STRING_KITE: {slug: "tech_sdp", frag: "t2sk"},
  TURBOT_FISH: {slug: "tech_sdp", frag: "tf"},
  EMPTY_RECTANGLE: {slug: "tech_sdp", frag: "er"},

  W_WING: {slug: "tech_wings", frag: "w"},
  XY_WING: {slug: "tech_wings", frag: "xy"},
  XYZ_WING: {slug: "tech_wings", frag: "xyz"},

  UNIQUENESS_1: {slug: "tech_ur", frag: "u1"},
  UNIQUENESS_2: {slug: "tech_ur", frag: "u2"},
  UNIQUENESS_3: {slug: "tech_ur", frag: "u3"},
  UNIQUENESS_4: {slug: "tech_ur", frag: "u4"},
  UNIQUENESS_5: {slug: "tech_ur", frag: "u5"},
  UNIQUENESS_6: {slug: "tech_ur", frag: "u6"},
  HIDDEN_RECTANGLE: {slug: "tech_ur", frag: "hr"},
  AVOIDABLE_RECTANGLE_1: {slug: "tech_ur", frag: "ar1"},
  AVOIDABLE_RECTANGLE_2: {slug: "tech_ur", frag: "ar2"},
  BUG_PLUS_1: {slug: "tech_ur", frag: "bug1"},

  SIMPLE_COLORS: {slug: "tech_col", frag: "sc"},
  MULTI_COLORS: {slug: "tech_col", frag: "mc"},

  REMOTE_PAIR: {slug: "tech_chains", frag: "rp"},
  X_CHAIN: {slug: "tech_chains", frag: "x"},
  XY_CHAIN: {slug: "tech_chains", frag: "xyc"},
  NICE_LOOP: {slug: "tech_chains", frag: "nl"},
  GROUPED_NICE_LOOP: {slug: "tech_chains", frag: "gnl"},

  ALS_XZ: {slug: "tech_als", frag: "axz"},
  ALS_XY_WING: {slug: "tech_als", frag: "axy"},
  ALS_XY_CHAIN: {slug: "tech_als", frag: "ach"},
  DEATH_BLOSSOM: {slug: "tech_als", frag: "db"},

  SUE_DE_COQ: {slug: "tech_misc", frag: "sdc"},

  KRAKEN_FISH: {slug: "tech_last", frag: "kf"},
  FORCING_CHAIN: {slug: "tech_last", frag: "fc"},
  FORCING_NET: {slug: "tech_last", frag: "fn"},
  TEMPLATE_SET: {slug: "tech_last", frag: "ts"},
  TEMPLATE_DEL: {slug: "tech_last", frag: "ts"},
  BRUTE_FORCE: {slug: "tech_last", frag: "bf"},
};

export const learnRefForTechnique = (technique: string): LearnRef | undefined =>
  TECHNIQUE_DOC[technique as SolutionType];

export const learnDocUrl = (slug: string): string => `${import.meta.env.BASE_URL}learn/${slug}.md`;

export const learnAssetBase = (): string => `${import.meta.env.BASE_URL}learn/`;
