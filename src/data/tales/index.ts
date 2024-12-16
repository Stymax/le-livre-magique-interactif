import { bouclesOr } from "./boucles-or";
import { hanselGretel } from "./hansel-gretel";
// ... Importez les autres contes de la même manière

export const taleContents = {
  "boucles-or": bouclesOr,
  "hansel-gretel": hanselGretel,
  // ... Ajoutez les autres contes ici
} as const;