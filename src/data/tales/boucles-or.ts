import { Tale } from "@/types/tale";
import { generateStoryImage } from "@/utils/runware";

const createTale = async (): Promise<Tale> => {
  const images = await Promise.all([
    generateStoryImage("Three bears' cozy cottage in the forest, with three different sized bears, fairy tale style illustration"),
    generateStoryImage("A curious little girl with golden curls discovering a cottage in the woods, three bowls of soup on the table, fairy tale style illustration"),
    generateStoryImage("Goldilocks tasting soup from three different sized bowls in a cozy cottage interior, fairy tale style illustration"),
    generateStoryImage("Goldilocks sitting in a broken small chair, with two other chairs nearby, fairy tale style illustration"),
    generateStoryImage("Goldilocks sleeping in a small bed, with two other beds visible in a cozy bedroom, fairy tale style illustration"),
    generateStoryImage("Goldilocks running away from three surprised bears in their cottage, fairy tale style illustration")
  ]);

  return {
    title: "Boucles d'or et les trois ours",
    content: [
      {
        text: "Il était une fois trois ours qui vivaient dans une jolie maison au cœur de la forêt. Il y avait Papa Ours, Maman Ours et Bébé Ours.",
        image: images[0]
      },
      {
        text: "Un jour, alors qu'ils attendaient que leur soupe refroidisse, ils partirent se promener. C'est alors qu'une petite fille aux boucles d'or, passant par là, découvrit leur maison.",
        image: images[1]
      },
      {
        text: "Curieuse, elle entra et vit trois bols de soupe. Elle goûta celui de Papa Ours - trop chaud ! Celui de Maman Ours - trop froid ! Celui de Bébé Ours - parfait !",
        image: images[2]
      },
      {
        text: "Fatiguée, elle essaya les fauteuils. Celui de Papa Ours - trop dur ! Celui de Maman Ours - trop mou ! Celui de Bébé Ours - parfait ! Mais il se cassa sous son poids.",
        image: images[3]
      },
      {
        text: "Elle monta à l'étage et vit trois lits. Celui de Papa Ours - trop haut ! Celui de Maman Ours - trop bas ! Celui de Bébé Ours - parfait ! Elle s'y endormit.",
        image: images[4]
      },
      {
        text: "Quand les trois ours rentrèrent, ils découvrirent le désordre. Boucles d'or, réveillée par leurs voix, s'enfuit effrayée, promettant de ne plus jamais entrer chez des inconnus sans permission.",
        image: images[5]
      }
    ],
    moral: "Il faut respecter la propriété d'autrui et ne pas entrer chez les gens sans y être invité."
  };
};

export const bouclesOr = createTale();