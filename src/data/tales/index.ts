import { bouclesOr } from "./boucles-or";
import { hanselGretel } from "./hansel-gretel";
import { blancheNeige } from "./blanche-neige";
import { raiponce } from "./raiponce";

export const taleContents = {
  "boucles-or": bouclesOr,
  "hansel-gretel": hanselGretel,
  "blanche-neige": blancheNeige,
  "raiponce": raiponce
} as const;