import { Tale } from "@/types/tale";
import { createBouclesOr } from "./boucles-or";
import { createHanselGretel } from "./hansel-gretel";

// Initialize with empty content that will be populated
export let taleContents: Record<string, Tale> = {
  "boucles-or": {
    title: "Boucles d'or et les trois ours",
    content: [],
    moral: "Il faut respecter la propriété d'autrui et ne pas entrer chez les gens sans y être invité."
  },
  "hansel-gretel": {
    title: "Hansel et Gretel",
    content: [],
    moral: "Le courage et l'intelligence permettent de surmonter les plus grandes épreuves."
  }
};

// Function to load all tales
export const loadTales = async () => {
  const [bouclesOr, hanselGretel] = await Promise.all([
    createBouclesOr(),
    createHanselGretel()
  ]);
  
  taleContents = {
    "boucles-or": bouclesOr,
    "hansel-gretel": hanselGretel
  };
};