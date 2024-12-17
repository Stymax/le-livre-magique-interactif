import { Tale } from "@/types/tale";
import { generateStoryImage } from "@/utils/runware";

export const hanselGretel: Tale = {
  title: "Hansel et Gretel",
  content: [
    {
      text: "À l'orée d'une grande forêt vivaient un pauvre bûcheron, sa femme et ses deux enfants. Le garçon s'appelait Hansel et la fille Gretel. La famille ne mangeait guère.",
      image: await generateStoryImage("A poor woodcutter's family at the edge of a dark forest, two children Hansel and Gretel, fairy tale style illustration")
    },
    {
      text: "Une année que la famine régnait dans le pays et que le pain lui-même vint à manquer, le bûcheron ruminait des idées noires, une nuit, dans son lit et remâchait ses soucis.",
      image: await generateStoryImage("A worried woodcutter lying in bed at night, thinking about his family's hunger, fairy tale style illustration")
    },
    {
      text: "La belle-mère convainquit le père d'abandonner les enfants dans la forêt. Hansel, qui avait entendu le plan, ramassa des cailloux blancs pour retrouver leur chemin.",
      image: await generateStoryImage("Two children collecting white pebbles in moonlight, near a forest path, fairy tale style illustration")
    },
    {
      text: "Perdus dans la forêt après une deuxième tentative, ils découvrirent une maison en pain d'épices. Une vieille femme les invita à entrer, mais c'était une sorcière qui emprisonna Hansel.",
      image: await generateStoryImage("A gingerbread house in the forest with candy decorations, an old witch inviting two children inside, fairy tale style illustration")
    },
    {
      text: "Gretel, rusée, poussa la sorcière dans son propre four. Les enfants prirent ses trésors et retrouvèrent leur père, maintenant veuf.",
      image: await generateStoryImage("Children escaping from a gingerbread house with treasures, running through the forest, fairy tale style illustration")
    }
  ],
  moral: "Le courage et l'intelligence permettent de surmonter les plus grandes épreuves."
};