import { Tale } from "@/types/tale";
import { bouclesOr } from "./boucles-or";
import { hanselGretel } from "./hansel-gretel";

export const taleContents: Record<string, Tale> = {
  "boucles-or": bouclesOr,
  "hansel-gretel": hanselGretel
};