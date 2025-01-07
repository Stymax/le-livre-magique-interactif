import { Tale } from "@/types/tale";
import { belleDormantContent } from "./content";
import { belleDormantContent2 } from "./content2";
import { belleDormantContent3 } from "./content3";

export const belleDormant: Tale = {
  title: "La Belle au bois dormant",
  content: [
    ...belleDormantContent,
    ...belleDormantContent2,
    ...belleDormantContent3
  ],
  moral: "L'amour véritable triomphe du temps et des mauvais sorts."
};