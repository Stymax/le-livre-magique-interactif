import { Tale } from "@/types/tale";
import { loupChevreauxContent } from "./loup-chevreaux/content";
import { loupChevreauxContent2 } from "./loup-chevreaux/content2";

export const loupChevreaux: Tale = {
  title: "Le loup et les sept chevreaux",
  content: [
    ...loupChevreauxContent,
    ...loupChevreauxContent2
  ],
  moral: "La prudence et l'obéissance aux conseils des parents sont essentielles pour se protéger du danger."
};