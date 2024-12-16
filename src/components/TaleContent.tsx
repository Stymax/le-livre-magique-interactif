import { motion } from "framer-motion";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const taleContents = {
  "boucles-or": {
    title: "Boucles d'or et les trois ours",
    content: [
      {
        text: "Il était une fois trois ours qui vivaient dans une jolie maison au cœur de la forêt. Il y avait Papa Ours, Maman Ours et Bébé Ours.",
        image: "/lovable-uploads/boucles-or-1.png"
      },
      {
        text: "Un jour, alors qu'ils attendaient que leur soupe refroidisse, ils partirent se promener. C'est alors qu'une petite fille aux boucles d'or, passant par là, découvrit leur maison.",
        image: "/lovable-uploads/boucles-or-2.png"
      },
      {
        text: "Curieuse, elle entra et vit trois bols de soupe. Elle goûta celui de Papa Ours - trop chaud ! Celui de Maman Ours - trop froid ! Celui de Bébé Ours - parfait !",
        image: "/lovable-uploads/boucles-or-3.png"
      },
      {
        text: "Fatiguée, elle essaya les fauteuils. Celui de Papa Ours - trop dur ! Celui de Maman Ours - trop mou ! Celui de Bébé Ours - parfait ! Mais il se cassa sous son poids.",
        image: "/lovable-uploads/boucles-or-4.png"
      },
      {
        text: "Elle monta à l'étage et vit trois lits. Celui de Papa Ours - trop haut ! Celui de Maman Ours - trop bas ! Celui de Bébé Ours - parfait ! Elle s'y endormit.",
        image: "/lovable-uploads/boucles-or-5.png"
      },
      {
        text: "Quand les trois ours rentrèrent, ils découvrirent le désordre. Boucles d'or, réveillée par leurs voix, s'enfuit effrayée, promettant de ne plus jamais entrer chez des inconnus sans permission.",
        image: "/lovable-uploads/boucles-or-6.png"
      }
    ],
    moral: "Il faut respecter la propriété d'autrui et ne pas entrer chez les gens sans y être invité."
  },
  "hansel-gretel": {
    title: "Hansel et Gretel",
    content: [
      {
        text: "À l'orée d'une grande forêt vivaient un pauvre bûcheron, sa femme et ses deux enfants. Le garçon s'appelait Hansel et la fille Gretel. La famille ne mangeait guère.",
        image: "/lovable-uploads/hansel-gretel-1.png"
      },
      {
        text: "Une année que la famine régnait dans le pays et que le pain lui-même vint à manquer, le bûcheron ruminait des idées noires, une nuit, dans son lit et remâchait ses soucis.",
        image: "/lovable-uploads/hansel-gretel-2.png"
      },
      {
        text: "La belle-mère convainquit le père d'abandonner les enfants dans la forêt. Hansel, qui avait entendu le plan, ramassa des cailloux blancs pour retrouver leur chemin.",
        image: "/lovable-uploads/hansel-gretel-3.png"
      },
      {
        text: "Perdus dans la forêt après une deuxième tentative, ils découvrirent une maison en pain d'épices. Une vieille femme les invita à entrer, mais c'était une sorcière qui emprisonna Hansel.",
        image: "/lovable-uploads/hansel-gretel-4.png"
      },
      {
        text: "Gretel, rusée, poussa la sorcière dans son propre four. Les enfants prirent ses trésors et retrouvèrent leur père, maintenant veuf.",
        image: "/lovable-uploads/hansel-gretel-5.png"
      }
    ],
    moral: "Le courage et l'intelligence permettent de surmonter les plus grandes épreuves."
  },
  "blanche-neige": {
    title: "Blanche-Neige",
    content: [
      {
        text: "Il était une fois une princesse à la peau blanche comme la neige, aux lèvres rouges comme le sang, et aux cheveux noirs comme l'ébène.",
        image: "/lovable-uploads/blanche-neige-1.png"
      },
      {
        text: "Sa belle-mère, une reine vaniteuse, consultait chaque jour son miroir magique. Un jour, celui-ci déclara que Blanche-Neige était la plus belle.",
        image: "/lovable-uploads/blanche-neige-2.png"
      },
      {
        text: "Folle de jalousie, la reine ordonna à un chasseur de tuer la princesse. Mais il la laissa s'enfuir dans la forêt.",
        image: "/lovable-uploads/blanche-neige-3.png"
      },
      {
        text: "Blanche-Neige trouva refuge chez sept nains. La reine, l'apprenant, lui apporta une pomme empoisonnée.",
        image: "/lovable-uploads/blanche-neige-4.png"
      },
      {
        text: "La princesse tomba dans un profond sommeil, jusqu'à ce qu'un prince la réveille d'un baiser.",
        image: "/lovable-uploads/blanche-neige-5.png"
      },
      {
        text: "Le prince l'emmena dans son château, et la méchante reine fut punie pour ses crimes.",
        image: "/lovable-uploads/blanche-neige-6.png"
      }
    ],
    moral: "La beauté intérieure est plus importante que la beauté extérieure, et le mal finit toujours par être puni."
  },
  "belle-dormant": {
    title: "La Belle au bois dormant",
    content: [
      {
        text: "À la naissance d'une princesse, toutes les fées du royaume furent invitées sauf une, qui se vengea en la maudissant.",
        image: "/lovable-uploads/belle-dormant-1.png"
      },
      {
        text: "La malédiction disait qu'à ses 16 ans, elle se piquerait le doigt à un fuseau et mourrait. Une bonne fée adoucit le sort en le transformant en sommeil de cent ans.",
        image: "/lovable-uploads/belle-dormant-2.png"
      },
      {
        text: "Malgré les précautions du roi, la princesse se piqua le doigt et s'endormit, ainsi que tout le château.",
        image: "/lovable-uploads/belle-dormant-3.png"
      },
      {
        text: "Une épaisse forêt d'épines poussa autour du château, repoussant tous les princes qui tentaient d'approcher.",
        image: "/lovable-uploads/belle-dormant-4.png"
      },
      {
        text: "Après cent ans, un prince courageux réussit à traverser les épines. Il trouva la princesse et la réveilla d'un baiser.",
        image: "/lovable-uploads/belle-dormant-5.png"
      },
      {
        text: "Le château entier se réveilla, et le prince et la princesse se marièrent dans la joie.",
        image: "/lovable-uploads/belle-dormant-6.png"
      }
    ],
    moral: "L'amour véritable peut surmonter tous les obstacles, même le temps."
  },
  "raiponce": {
    title: "Raiponce",
    content: [
      {
        text: "Une sorcière gardait une jeune fille aux longs cheveux d'or, nommée Raiponce, enfermée dans une haute tour sans porte.",
        image: "/lovable-uploads/raiponce-1.png"
      },
      {
        text: "Chaque jour, la sorcière montait en grimpant aux cheveux de Raiponce, qu'elle faisait descendre par la fenêtre.",
        image: "/lovable-uploads/raiponce-2.png"
      },
      {
        text: "Un jour, un prince entendit Raiponce chanter et découvrit le secret de la tour.",
        image: "/lovable-uploads/raiponce-3.png"
      },
      {
        text: "Il rendit visite à Raiponce en utilisant la même méthode que la sorcière. Ils tombèrent amoureux.",
        image: "/lovable-uploads/raiponce-4.png"
      },
      {
        text: "La sorcière, furieuse de cette découverte, coupa les cheveux de Raiponce et l'exila dans le désert.",
        image: "/lovable-uploads/raiponce-5.png"
      },
      {
        text: "Après de nombreuses épreuves, le prince retrouva Raiponce et ils vécurent heureux.",
        image: "/lovable-uploads/raiponce-6.png"
      }
    ],
    moral: "L'amour donne le courage de s'opposer à l'oppression et de chercher la liberté."
  },
  "loup-chevreaux": {
    title: "Le loup et les sept chevreaux",
    content: [
      {
        text: "Une chèvre vivait avec ses sept chevreaux. Un jour, elle dut s'absenter pour chercher de la nourriture.",
        image: "/lovable-uploads/loup-chevreaux-1.png"
      },
      {
        text: "Elle avertit ses petits de n'ouvrir à personne, car le loup rôdait. Le loup vint et tenta d'entrer en imitant la voix de leur mère.",
        image: "/lovable-uploads/loup-chevreaux-2.png"
      },
      {
        text: "Les chevreaux reconnurent sa patte noire et refusèrent d'ouvrir. Le loup mangea de la craie pour adoucir sa voix.",
        image: "/lovable-uploads/loup-chevreaux-3.png"
      },
      {
        text: "Il revint et réussit à tromper les chevreaux. Il les mangea tous sauf le plus petit qui se cacha.",
        image: "/lovable-uploads/loup-chevreaux-4.png"
      },
      {
        text: "La mère, de retour, découvrit le drame. Avec le petit chevreau, elle retrouva le loup endormi.",
        image: "/lovable-uploads/loup-chevreaux-5.png"
      },
      {
        text: "Ils libérèrent les chevreaux du ventre du loup et le remplirent de pierres. Le loup tomba dans un puits.",
        image: "/lovable-uploads/loup-chevreaux-6.png"
      }
    ],
    moral: "Il faut être prudent et ne pas faire confiance aux étrangers, même s'ils semblent gentils."
  },
  "musiciens-breme": {
    title: "Les musiciens de Brême",
    content: [
      {
        text: "Un âne trop vieux pour travailler décida d'aller à Brême pour devenir musicien.",
        image: "/lovable-uploads/musiciens-breme-1.png"
      },
      {
        text: "En chemin, il rencontra un chien, un chat et un coq, tous rejetés par leurs maîtres car trop vieux.",
        image: "/lovable-uploads/musiciens-breme-2.png"
      },
      {
        text: "Ils décidèrent de voyager ensemble pour devenir musiciens à Brême.",
        image: "/lovable-uploads/musiciens-breme-3.png"
      },
      {
        text: "La nuit tombée, ils découvrirent une maison habitée par des brigands.",
        image: "/lovable-uploads/musiciens-breme-4.png"
      },
      {
        text: "Montés les uns sur les autres, ils firent un vacarme qui effraya les brigands.",
        image: "/lovable-uploads/musiciens-breme-5.png"
      },
      {
        text: "Les animaux s'installèrent dans la maison et n'allèrent jamais jusqu'à Brême, ayant trouvé un foyer.",
        image: "/lovable-uploads/musiciens-breme-6.png"
      }
    ],
    moral: "L'union fait la force, et il n'est jamais trop tard pour recommencer une nouvelle vie."
  },
  "tom-pouce": {
    title: "Tom Pouce",
    content: [
      {
        text: "Il était une fois un couple qui souhaitait tant avoir un enfant qu'ils eurent un fils pas plus grand qu'un pouce.",
        image: "/lovable-uploads/tom-pouce-1.png"
      },
      {
        text: "Malgré sa taille, Tom était débrouillard et intelligent. Il aidait son père dans son travail de tailleur.",
        image: "/lovable-uploads/tom-pouce-2.png"
      },
      {
        text: "Un jour, des marchands passèrent et achetèrent Tom pour le montrer dans leur spectacle.",
        image: "/lovable-uploads/tom-pouce-3.png"
      },
      {
        text: "Tom vécut de nombreuses aventures : il fut avalé par une vache, puis par un loup.",
        image: "/lovable-uploads/tom-pouce-4.png"
      },
      {
        text: "Grâce à sa ruse, il réussit toujours à s'en sortir et à retrouver ses parents.",
        image: "/lovable-uploads/tom-pouce-5.png"
      },
      {
        text: "Sa petite taille, qui semblait un handicap, devint son plus grand atout.",
        image: "/lovable-uploads/tom-pouce-6.png"
      }
    ],
    moral: "Ce n'est pas la taille qui compte, mais l'intelligence et le courage."
  }
};

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const tale = taleContents[id as keyof typeof taleContents];

  if (!tale) return null;

  const handleNarration = async () => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      const text = tale.content.map(segment => segment.text).join(" ");
      
      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": import.meta.env.VITE_ELEVEN_LABS_API_KEY || ''
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
      };

      setAudio(newAudio);
      await newAudio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Erreur de narration:', error);
      toast({
        title: "Erreur de narration",
        description: "Impossible de générer la narration. Veuillez vérifier votre clé API Eleven Labs.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-magical-gold hover:text-magical-gold/80 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour aux contes
        </button>

        <button
          onClick={handleNarration}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-magical-gold/20 text-magical-gold hover:bg-magical-gold/30 transition-colors"
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isPlaying ? "Arrêter" : "Écouter"}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-magical-gold mb-8">{tale.title}</h2>

      <div className="space-y-12 text-white/90">
        {tale.content.map((segment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-4"
          >
            {segment.image && (
              <img
                src={segment.image}
                alt={`Illustration ${index + 1} de ${tale.title}`}
                className="w-full h-64 object-cover rounded-xl"
              />
            )}
            <p className="leading-relaxed">{segment.text}</p>
          </motion.div>
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
