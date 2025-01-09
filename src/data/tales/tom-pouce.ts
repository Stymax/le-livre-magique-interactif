import { Tale } from "@/types/tale";
import { tomPouceContent } from "./tom-pouce/content";
import { tomPouceContent2 } from "./tom-pouce/content2";
import { tomPouceContent3 } from "./tom-pouce/content3";
import { tomPouceContent4 } from "./tom-pouce/content4";
import { tomPouceContent5 } from "./tom-pouce/content5";

export const tomPouce: Tale = {
  title: "Tom Pouce",
  content: [
    ...tomPouceContent,
    ...tomPouceContent2,
    ...tomPouceContent3,
    ...tomPouceContent4,
    ...tomPouceContent5
  ],
  moral: "La taille ne fait pas la valeur d'une personne, et l'intelligence peut compenser la force physique."
};