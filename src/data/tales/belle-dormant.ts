import { Tale } from "@/types/tale";
import { belleDormantContent } from "./belle-dormant/content";
import { belleDormantContent2 } from "./belle-dormant/content2";
import { belleDormantContent3 } from "./belle-dormant/content3";


export const belleDormant: Tale = {
  title: "Blanche-Neige",
  content: [
    ...belleDormantContent,
    ...belleDormantContent2,
    ...belleDormantContent3
  ],
  moral: "L'amour véritable triomphe du temps et des mauvais sorts."
};