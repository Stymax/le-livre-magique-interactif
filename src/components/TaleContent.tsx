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

  const handleNarration = () => {
    if (isPlaying) {
      // Stop current narration
      if (narrationTimeoutRef.current) {
        clearTimeout(narrationTimeoutRef.current);
      }
      generateNarration('');
      return;
    }

    // Start narration from current page
    const remainingSegments = tale.content.slice(currentPage);
    const averageWordsPerMinute = 150; // Adjust this value based on narration speed
    
    remainingSegments.forEach((segment, index) => {
      const words = segment.text.split(' ').length;
      const estimatedSeconds = (words / averageWordsPerMinute) * 60;
      
      narrationTimeoutRef.current = setTimeout(() => {
        if (currentPage + index < tale.content.length - 1) {
          setCurrentPage(currentPage + index + 1);
        }
      }, estimatedSeconds * 1000);
    });

    const text = remainingSegments.map(segment => segment.text).join(" ");
    generateNarration(text);
  };

  // Cleanup timeouts on unmount or when stopping narration
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

      <div className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20">
        <h3 className="text-magical-turquoise font-semibold mb-2">Morale de l'histoire :</h3>
        <p className="text-white/80 italic">{tale.moral}</p>
      </div>
    </motion.div>
  );
};

export default TaleContent;