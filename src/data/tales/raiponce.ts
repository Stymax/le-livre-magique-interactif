import { Tale } from "@/types/tale";
import { raiponcecontent } from "./raiponce/content";
import { raiponcecontent2 } from "./raiponce/content2";
import { raiponcecontent3 } from "./raiponce/content3";


export const raiponce: Tale = {
  title: "Raiponce",
  content: [
    ...raiponcecontent,
    ...raiponcecontent2,
    ...raiponcecontent3
  ],
  moral: "L'amour véritable triomphe de tous les obstacles."
};


