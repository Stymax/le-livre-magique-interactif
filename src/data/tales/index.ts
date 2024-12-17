import { Tale } from "@/types/tale";
import { bouclesOr } from "./boucles-or";
import { hanselGretel } from "./hansel-gretel";
import { blancheNeige } from "./blanche-neige";
import { belleDormant } from "./belle-dormant";

export const taleContents: Record<string, Tale> = {
  "boucles-or": bouclesOr,
  "hansel-gretel": hanselGretel,
  "blanche-neige": blancheNeige,
  "belle-dormant": belleDormant
};