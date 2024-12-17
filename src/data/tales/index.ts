import { Tale } from "@/types/tale";
import { bouclesOr } from "./boucles-or";
import { hanselGretel } from "./hansel-gretel";

export const loadTales = async () => {
  const [bouclesOrTale, hanselGretelTale] = await Promise.all([
    bouclesOr,
    hanselGretel
  ]);

  return {
    "boucles-or": bouclesOrTale,
    "hansel-gretel": hanselGretelTale
  } as const;
};

export const taleContents: Record<string, Tale> = {};

// Initialize tales
loadTales().then(tales => {
  Object.assign(taleContents, tales);
});