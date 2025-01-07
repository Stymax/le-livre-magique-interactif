import { Tale } from "@/types/tale";
import { hanselGretelContent } from "./hansel-gretel/content";
import { hanselGretelContent2 } from "./hansel-gretel/content2";
import { hanselGretelContent3 } from "./hansel-gretel/content3";
import { hanselGretelContent4 } from "./hansel-gretel/content4";


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