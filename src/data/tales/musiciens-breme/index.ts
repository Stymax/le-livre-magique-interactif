import { Tale } from "@/types/tale";
import { musiciensBremContent } from "./content";
import { musiciensBremContent2 } from "./content2";
import { musiciensBremContent3 } from "./content3";
import { musiciensBremContent4 } from "./content4";
import { musiciensBremContent5 } from "./content5";
import { musiciensBremContent6 } from "./content6";
import { musiciensBremContent7 } from "./content7";

export const musiciensBreme: Tale = {
  title: "Les musiciens de Brême",
  content: [
    ...musiciensBremContent,
    ...musiciensBremContent2,
    ...musiciensBremContent3,
    ...musiciensBremContent4,
    ...musiciensBremContent5,
    ...musiciensBremContent6,
    ...musiciensBremContent7
  ],
  moral: "L'union fait la force, et chacun peut trouver sa place malgré ses différences."
};