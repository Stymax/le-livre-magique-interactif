import { tomPouceContent } from "./content";
import { tomPouceContent2 } from "./content2";
import { tomPouceContent3 } from "./content3";
import { tomPouceContent4 } from "./content4";
import { tomPouceContent5 } from "./content5";

export const tomPouce = {
  id: "tom-pouce",
  title: "Tom Pouce",
  description: "L'histoire d'un petit garçon pas plus grand qu'un pouce qui vit de grandes aventures.",
  content: [
    ...tomPouceContent,
    ...tomPouceContent2,
    ...tomPouceContent3,
    ...tomPouceContent4,
    ...tomPouceContent5
  ],
  moral: "La taille ne fait pas tout : même les plus petits peuvent accomplir de grandes choses grâce à leur intelligence et leur courage."
};