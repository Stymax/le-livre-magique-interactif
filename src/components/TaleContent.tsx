import { motion } from "framer-motion";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import TaleStory from "./TaleStory";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { taleContents } from "@/data/tales";
import { generateAndSaveImage } from "@/utils/imageGenerator";

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
  const lastPlayedPageRef = useRef(-1); // Changed to -1 to ensure first page plays

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

  useEffect(() => {
    if (isPlaying && currentPage !== lastPlayedPageRef.current) {
      playAudioForPage(currentPage);
    }
  }, [currentPage, isPlaying]);

  const playAudioForPage = async (pageIndex: number) => {
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audioPath = `/audio/${id}/${id}-${pageIndex + 1}.mp3`;
      const audio = new Audio(audioPath);
      
      audio.onended = () => {
        if (isPlaying) {
          if (pageIndex === tale.content.length - 1) {
            const moralPath = `/audio/${id}/${id}-moral.mp3`;
            const moralAudio = new Audio(moralPath);
            moralAudio.onended = () => {
              setIsPlaying(false);
              setCurrentPage(0);
            };
            setCurrentAudio(moralAudio);
            moralAudio.play().catch(error => {
              console.error('Error playing moral audio:', error);
              toast.error("Erreur lors de la lecture de la morale");
              setIsPlaying(false);
            });
          } else {
            setCurrentPage(pageIndex + 1);
          }
        }
      };

      setCurrentAudio(audio);
      lastPlayedPageRef.current = pageIndex;
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error("Erreur lors de la lecture audio");
      setIsPlaying(false);
    }
  };

  const handleNarration = async () => {
    if (isPlaying) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      setIsPlaying(false);
      lastPlayedPageRef.current = currentPage;
    } else {
      setIsPlaying(true);
      lastPlayedPageRef.current = -1; // Reset to ensure first page plays
      playAudioForPage(currentPage);
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
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
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