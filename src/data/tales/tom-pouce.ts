import { Tale } from "@/types/tale";
import { tomPouceContent } from "./tom-pouce/content";
import { tomPouceContent2 } from "./tom-pouce/content2";
import { tomPouceContent3 } from "./tom-pouce/content3";
import { tomPouceContent4 } from "./tom-pouce/content4";
import { tomPouceContent5 } from "./tom-pouce/content5";
import { tomPouceContent6 } from "./tom-pouce/content6";
import { tomPouceContent7 } from "./tom-pouce/content7";
import { tomPouceContent8 } from "./tom-pouce/content8";
import { tomPouceContent9 } from "./tom-pouce/content9";
import { tomPouceContent10 } from "./tom-pouce/content10";
import { tomPouceContent11 } from "./tom-pouce/content11";
import { tomPouceContent12 } from "./tom-pouce/content12";

export const tomPouce: Tale = {
  title: "Tom Pouce",
  content: [
    ...tomPouceContent,
    ...tomPouceContent2,
    ...tomPouceContent3,
    ...tomPouceContent4,
    ...tomPouceContent5,
    ...tomPouceContent6,
    ...tomPouceContent7,
    ...tomPouceContent8,
    ...tomPouceContent9,
    ...tomPouceContent10,
    ...tomPouceContent11,
    ...tomPouceContent12
  ],
  moral: "La taille ne fait pas la valeur d'une personne, et l'intelligence peut compenser la force physique."
};