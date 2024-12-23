import { motion } from "framer-motion";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import TaleStory from "./TaleStory";
import { useNarration } from "@/utils/useNarration";
import { taleContents } from "@/data/tales";
import { generateAndSaveImage } from "@/utils/imageGenerator";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const { isPlaying, generateNarration } = useNarration();
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const tale = taleContents[id as keyof typeof taleContents];
  const narrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isNarrationStarting, setIsNarrationStarting] = useState(false);

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
        toast.success(`Images vérifiées pour ${tale.title}`);
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
    if (isPlaying) {
      // Stop current narration
      if (narrationTimeoutRef.current) {
        clearTimeout(narrationTimeoutRef.current);
        narrationTimeoutRef.current = null;
      }
      generateNarration('');
      setIsNarrationStarting(false);
      return;
    }

    setIsNarrationStarting(true);
    
    const narrateNextPage = async (pageIndex: number) => {
      if (pageIndex >= tale.content.length || !isPlaying) {
        setIsNarrationStarting(false);
        return;
      }

      try {
        const currentSegment = tale.content[pageIndex];
        setCurrentPage(pageIndex);
        
        await generateNarration(currentSegment.text);
        
        // Estimer le temps de lecture pour cette page
        const words = currentSegment.text.split(' ').length;
        const averageWordsPerMinute = 150;
        const estimatedSeconds = (words / averageWordsPerMinute) * 60;
        
        // Programmer la narration de la page suivante
        narrationTimeoutRef.current = setTimeout(() => {
          narrateNextPage(pageIndex + 1);
        }, estimatedSeconds * 1000);
        
      } catch (error) {
        console.error('Error during narration:', error);
        toast.error("Erreur lors de la narration");
        setIsNarrationStarting(false);
      }
    };

    // Démarrer la narration à partir de la page actuelle
    await narrateNextPage(currentPage);
  };

  // Cleanup timeout on unmount or when stopping narration
  useEffect(() => {
    return () => {
      if (narrationTimeoutRef.current) {
        clearTimeout(narrationTimeoutRef.current);
      }
    };
  }, []);

  if (!tale) return null;

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
          disabled={isNarrationStarting}
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-magical-gold/20 text-magical-gold hover:bg-magical-gold/30 transition-colors ${
            isNarrationStarting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isNarrationStarting ? "Préparation..." : isPlaying ? "Arrêter" : "Écouter"}
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

      <div className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20">
        <h3 className="text-magical-turquoise font-semibold mb-2">Morale de l'histoire :</h3>
        <p className="text-white/80 italic">{tale.moral}</p>
      </div>
    </motion.div>
  );
};

export default TaleContent;