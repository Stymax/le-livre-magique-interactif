import { Tale } from "@/types/tale";
import { hanselGretelContent } from "./content";
import { hanselGretelContent2 } from "./content2";
import { hanselGretelContent3 } from "./content3";
import { hanselGretelContent4 } from "./content4";


export const hanselGretel: Tale = {
  title: "Hansel-Gretel",
  content: [
    ...hanselGretelContent,
    ...hanselGretelContent2,
    ...hanselGretelContent3,
    ...hanselGretelContent4
  ],
  moral: "La ruse et la solidarité fraternelle permettent de surmonter les plus grandes épreuves."
};