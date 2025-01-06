import { Tale } from "@/types/tale";
import { blancheNeigeContent } from "./content";
import { blancheNeigeContent2 } from "./content2";
import { blancheNeigeContent3 } from "./content3";
import { blancheNeigeContent4 } from "./content4";
import { blancheNeigeContent5 } from "./content5";

export const blancheNeige: Tale = {
  title: "Blanche-Neige",
  content: [
    ...blancheNeigeContent,
    ...blancheNeigeContent2,
    ...blancheNeigeContent3,
    ...blancheNeigeContent4,
    ...blancheNeigeContent5
  ],
  moral: "La beauté intérieure et la bonté triomphent toujours de la vanité et de la jalousie."
};