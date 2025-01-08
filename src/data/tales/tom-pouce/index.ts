import { Tale } from "@/types/tale";
import { tomPouceContent } from "./content";
import { tomPouceContent2 } from "./content2";
import { tomPouceContent3 } from "./content3";

export const tomPouce: Tale = {
  title: "Tom Pouce",
  content: [
    ...tomPouceContent,
    ...tomPouceContent2,
    ...tomPouceContent3
  ],
  moral: "La taille ne fait pas la valeur d'une personne, et l'intelligence peut compenser la force physique."
};