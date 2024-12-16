import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const taleContents = {
  "boucles-or": {
    title: "Boucles d'or et les trois ours",
    content: [
      "Il était une fois trois ours qui vivaient dans une jolie maison au cœur de la forêt. Il y avait Papa Ours, Maman Ours et Bébé Ours.",
      "Un jour, alors qu'ils attendaient que leur soupe refroidisse, ils partirent se promener. C'est alors qu'une petite fille aux boucles d'or, passant par là, découvrit leur maison.",
      "Curieuse, elle entra et vit trois bols de soupe. Elle goûta celui de Papa Ours - trop chaud ! Celui de Maman Ours - trop froid ! Celui de Bébé Ours - parfait !",
      "Fatiguée, elle essaya les fauteuils. Celui de Papa Ours - trop dur ! Celui de Maman Ours - trop mou ! Celui de Bébé Ours - parfait ! Mais il se cassa sous son poids.",
      "Elle monta à l'étage et vit trois lits. Celui de Papa Ours - trop haut ! Celui de Maman Ours - trop bas ! Celui de Bébé Ours - parfait ! Elle s'y endormit.",
      "Quand les trois ours rentrèrent, ils découvrirent le désordre. Boucles d'or, réveillée par leurs voix, s'enfuit effrayée, promettant de ne plus jamais entrer chez des inconnus sans permission."
    ],
    moral: "Il faut respecter la propriété d'autrui et ne pas entrer chez les gens sans y être invité."
  },
  "hansel-gretel": {
    title: "Hansel et Gretel",
    content: [
      "Dans une forêt vivait un pauvre bûcheron avec ses deux enfants, Hansel et Gretel, et leur belle-mère.",
      "La famine sévissait, et la belle-mère convainquit le père d'abandonner les enfants dans la forêt. Hansel, qui avait entendu le plan, ramassa des cailloux blancs.",
      "Le lendemain, ils s'enfoncèrent dans la forêt. Hansel sema ses cailloux et put ainsi retrouver le chemin de la maison avec sa sœur.",
      "La belle-mère, furieuse, recommença. Cette fois, Hansel n'eut que des miettes de pain qui furent mangées par les oiseaux.",
      "Perdus dans la forêt, ils découvrirent une maison en pain d'épices. Une vieille femme les invita à entrer, mais c'était une sorcière qui emprisonna Hansel.",
      "Gretel, rusée, poussa la sorcière dans son propre four. Les enfants prirent ses trésors et retrouvèrent leur père, maintenant veuf.",
    ],
    moral: "Le courage et l'intelligence permettent de surmonter les plus grandes épreuves."
  },
  "blanche-neige": {
    title: "Blanche-Neige",
    content: [
      "Il était une fois une princesse à la peau blanche comme la neige, aux lèvres rouges comme le sang, et aux cheveux noirs comme l'ébène.",
      "Sa belle-mère, une reine vaniteuse, consultait chaque jour son miroir magique. Un jour, celui-ci déclara que Blanche-Neige était la plus belle.",
      "Folle de jalousie, la reine ordonna à un chasseur de tuer la princesse. Mais il la laissa s'enfuir dans la forêt.",
      "Blanche-Neige trouva refuge chez sept nains. La reine, l'apprenant, lui apporta une pomme empoisonnée.",
      "La princesse tomba dans un profond sommeil, jusqu'à ce qu'un prince la réveille d'un baiser.",
      "Le prince l'emmena dans son château, et la méchante reine fut punie pour ses crimes."
    ],
    moral: "La beauté intérieure est plus importante que la beauté extérieure, et le mal finit toujours par être puni."
  },
  "belle-dormant": {
    title: "La Belle au bois dormant",
    content: [
      "À la naissance d'une princesse, toutes les fées du royaume furent invitées sauf une, qui se vengea en la maudissant.",
      "La malédiction disait qu'à ses 16 ans, elle se piquerait le doigt à un fuseau et mourrait. Une bonne fée adoucit le sort en le transformant en sommeil de cent ans.",
      "Malgré les précautions du roi, la princesse se piqua le doigt et s'endormit, ainsi que tout le château.",
      "Une épaisse forêt d'épines poussa autour du château, repoussant tous les princes qui tentaient d'approcher.",
      "Après cent ans, un prince courageux réussit à traverser les épines. Il trouva la princesse et la réveilla d'un baiser.",
      "Le château entier se réveilla, et le prince et la princesse se marièrent dans la joie."
    ],
    moral: "L'amour véritable peut surmonter tous les obstacles, même le temps."
  },
  "raiponce": {
    title: "Raiponce",
    content: [
      "Une sorcière gardait une jeune fille aux longs cheveux d'or, nommée Raiponce, enfermée dans une haute tour sans porte.",
      "Chaque jour, la sorcière montait en grimpant aux cheveux de Raiponce, qu'elle faisait descendre par la fenêtre.",
      "Un jour, un prince entendit Raiponce chanter et découvrit le secret de la tour.",
      "Il rendit visite à Raiponce en utilisant la même méthode que la sorcière. Ils tombèrent amoureux.",
      "La sorcière, furieuse de cette découverte, coupa les cheveux de Raiponce et l'exila dans le désert.",
      "Après de nombreuses épreuves, le prince retrouva Raiponce et ils vécurent heureux."
    ],
    moral: "L'amour donne le courage de s'opposer à l'oppression et de chercher la liberté."
  },
  "loup-chevreaux": {
    title: "Le loup et les sept chevreaux",
    content: [
      "Une chèvre vivait avec ses sept chevreaux. Un jour, elle dut s'absenter pour chercher de la nourriture.",
      "Elle avertit ses petits de n'ouvrir à personne, car le loup rôdait. Le loup vint et tenta d'entrer en imitant la voix de leur mère.",
      "Les chevreaux reconnurent sa patte noire et refusèrent d'ouvrir. Le loup mangea de la craie pour adoucir sa voix.",
      "Il revint et réussit à tromper les chevreaux. Il les mangea tous sauf le plus petit qui se cacha.",
      "La mère, de retour, découvrit le drame. Avec le petit chevreau, elle retrouva le loup endormi.",
      "Ils libérèrent les chevreaux du ventre du loup et le remplirent de pierres. Le loup tomba dans un puits."
    ],
    moral: "Il faut être prudent et ne pas faire confiance aux étrangers, même s'ils semblent gentils."
  },
  "musiciens-breme": {
    title: "Les musiciens de Brême",
    content: [
      "Un âne trop vieux pour travailler décida d'aller à Brême pour devenir musicien.",
      "En chemin, il rencontra un chien, un chat et un coq, tous rejetés par leurs maîtres car trop vieux.",
      "Ils décidèrent de voyager ensemble pour devenir musiciens à Brême.",
      "La nuit tombée, ils découvrirent une maison habitée par des brigands.",
      "Montés les uns sur les autres, ils firent un vacarme qui effraya les brigands.",
      "Les animaux s'installèrent dans la maison et n'allèrent jamais jusqu'à Brême, ayant trouvé un foyer."
    ],
    moral: "L'union fait la force, et il n'est jamais trop tard pour recommencer une nouvelle vie."
  },
  "tom-pouce": {
    title: "Tom Pouce",
    content: [
      "Il était une fois un couple qui souhaitait tant avoir un enfant qu'ils eurent un fils pas plus grand qu'un pouce.",
      "Malgré sa taille, Tom était débrouillard et intelligent. Il aidait son père dans son travail de tailleur.",
      "Un jour, des marchands passèrent et achetèrent Tom pour le montrer dans leur spectacle.",
      "Tom vécut de nombreuses aventures : il fut avalé par une vache, puis par un loup.",
      "Grâce à sa ruse, il réussit toujours à s'en sortir et à retrouver ses parents.",
      "Sa petite taille, qui semblait un handicap, devint son plus grand atout."
    ],
    moral: "Ce n'est pas la taille qui compte, mais l'intelligence et le courage."
  }
};

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const tale = taleContents[id as keyof typeof taleContents];

  if (!tale) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="text-magical-gold hover:text-magical-gold/80 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        Retour aux contes
      </button>

      <h2 className="text-3xl font-bold text-magical-gold mb-8">{tale.title}</h2>

      <div className="space-y-6 text-white/90">
        {tale.content.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <div className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20">
        <h3 className="text-magical-turquoise font-semibold mb-2">Morale de l'histoire :</h3>
        <p className="text-white/80 italic">{tale.moral}</p>
      </div>
    </motion.div>
  );
};

export default TaleContent;