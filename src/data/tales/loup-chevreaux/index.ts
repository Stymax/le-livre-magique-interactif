import { Tale } from "@/types/tale";
import { loupChevreauxContent } from "./content";
import { loupChevreauxContent2 } from "./content2";

export const loupChevreaux: Tale = {
  title: "Le loup et les sept chevreaux",
  content: [
    ...loupChevreauxContent,
    ...loupChevreauxContent2
  ],
  moral: "La prudence et l'intelligence permettent de déjouer les ruses du mal."
};