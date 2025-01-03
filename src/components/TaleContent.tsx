import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import TaleStory from "./TaleStory";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { taleContents } from "@/data/tales";
import { generateAndSaveImage } from "@/utils/imageGenerator";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

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
  const lastPlayedPageRef = useRef(-1);

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

      // Construct the audio path using window.location.origin to get the base URL
      const baseUrl = window.location.origin;
      const audioPath = `${baseUrl}/audio/${id}/${id}-${pageIndex + 1}.mp3`;
      const audio = new Audio(audioPath);
      
      audio.onended = () => {
        if (isPlaying) {
          if (pageIndex < tale.content.length - 1) {
            setCurrentPage(pageIndex + 1);
          } else {
            // Play moral audio when reaching the last page
            const moralPath = `${baseUrl}/audio/${id}/${id}-moral.mp3`;
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
      lastPlayedPageRef.current = -1;
      await playAudioForPage(currentPage);
    }
  };

  if (!tale) return null;

  const progress = ((currentPage + 1) / tale.content.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-4">
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-magical-gold">{tale.title}</h2>
          <div className="flex gap-2">
            {currentPage > 0 && (
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Retour
              </Button>
            )}
            {currentPage < tale.content.length - 1 && (
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            {currentPage === tale.content.length - 1 && (
              <Button
                onClick={() => setCurrentPage(0)}
                className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
              >
                Début
              </Button>
            )}
          </div>
        </div>

        <Progress value={progress} className="h-2 bg-magical-gold/20" indicatorClassName="bg-magical-gold" />

        {isGeneratingImages && (
          <div className="text-center text-magical-turquoise animate-pulse">
            Génération des images en cours...
          </div>
        )}

        <div className="space-y-8">
          <TaleStory 
            content={tale.content} 
            title={tale.title} 
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />

          {currentPage === tale.content.length - 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20"
            >
              <h3 className="text-magical-turquoise text-xl font-semibold mb-4">Morale de l'histoire :</h3>
              <p className="text-white/90 italic text-lg">{tale.moral}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaleContent;