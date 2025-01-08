import { Tale } from "@/types/tale";
import { musiciensBremContent } from "./musiciens-breme/content";
import { musiciensBremContent2 } from "./musiciens-breme/content2";

export const musiciensBreme: Tale = {
  title: "Les musiciens de Brême",
  content: [
    ...musiciensBremContent,
    ...musiciensBremContent2
  ],
  moral: "L'union fait la force, et chacun peut trouver sa place malgré ses différences."
};