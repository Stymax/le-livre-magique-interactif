import { Tale } from "@/types/tale";
import { raiponcecontent } from "./content";
import { raiponcecontent2 } from "./content2";
import { raiponcecontent3 } from "./content3";

export const raiponce: Tale = {
  title: "Raiponce",
  content: [
    ...raiponcecontent,
    ...raiponcecontent2,
    ...raiponcecontent3
  ],
  moral: "L'amour véritable triomphe de tous les obstacles."
};