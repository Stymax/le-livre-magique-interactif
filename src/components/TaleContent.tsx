import { motion } from "framer-motion";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import TaleStory from "./TaleStory";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { taleContents } from "@/data/tales";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const tale = taleContents[id as keyof typeof taleContents];

  useEffect(() => {
    const generateMissingImages = async () => {
      if (!tale) return;
      
      setIsGeneratingImages(true);
      toast.info(`Vérification des images pour ${tale.title}...`);
      
      try {
        for (let i = 0; i < tale.content.length; i++) {
          const segment = tale.content[i];
          if (segment.image && segment.imagePrompt) {
            const fileName = `${id}-${i + 1}.png`;
            await generateAndSaveImage({
              prompt: segment.imagePrompt,
              fileName,
              title: tale.title
            });
          }
        }
      } catch (error) {
        console.error('Error generating images:', error);
        toast.error(`Erreur lors de la génération des images pour ${tale.title}`);
      } finally {
        setIsGeneratingImages(false);
      }
    };

    generateMissingImages();
  }, [id, tale]);

  const handleNarration = async () => {
    if (isPlaying && currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      // Arrêter l'audio précédent s'il existe
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // Créer un nouvel audio pour la page courante
      const audio = new Audio(`/audio/${id}-${currentPage + 1}.mp3`);
      
      audio.onended = () => {
        // Si c'est la dernière page, jouer l'audio de la morale
        if (currentPage === tale.content.length - 1) {
          const moralAudio = new Audio(`/audio/${id}-moral.mp3`);
          moralAudio.play();
          setCurrentAudio(moralAudio);
        }
        setIsPlaying(false);
      };

      setCurrentAudio(audio);
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error("Erreur lors de la lecture audio");
      setIsPlaying(false);
    }
  };

  if (!tale) return null;

  const showMoral = currentPage === tale.content.length - 1;

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

      {isGeneratingImages && (
        <div className="text-center text-magical-turquoise animate-pulse">
          Génération des images en cours...
        </div>
      )}

      <TaleStory 
        content={tale.content} 
        title={tale.title} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {showMoral && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20"
        >
          <h3 className="text-magical-turquoise font-semibold mb-2">Morale de l'histoire :</h3>
          <p className="text-white/80 italic">{tale.moral}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaleContent;
