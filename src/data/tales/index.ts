import { bouclesOr } from "./boucles-or";
import { hanselGretel } from "./hansel-gretel";
import { blancheNeige } from "./blanche-neige";
import { raiponce } from "./raiponce";
import { belleDormant } from "./belle-dormant";
import { loupChevreaux } from "./loup-chevreaux";
import { musiciensBreme } from "./musiciens-breme";
import { tomPouce } from "./tom-pouce";

export const taleContents = {
  "boucles-or": bouclesOr,
  "hansel-gretel": hanselGretel,
  "blanche-neige": blancheNeige,
  "raiponce": raiponce,
  "belle-dormant": belleDormant,
  "loup-chevreaux": loupChevreaux,
  "musiciens-breme": musiciensBreme,
  "tom-pouce": tomPouce
} as const;