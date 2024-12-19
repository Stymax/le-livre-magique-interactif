import { motion } from "framer-motion";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import TaleStory from "./TaleStory";
import { useNarration } from "@/utils/useNarration";
import { taleContents } from "@/data/tales";
import { generateAndSaveImage } from "@/utils/imageGenerator";
import { useState, useEffect } from "react";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const { isPlaying, generateNarration } = useNarration();
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const tale = taleContents[id as keyof typeof taleContents];

  useEffect(() => {
    const generateMissingImages = async () => {
      if (!tale) return;
      
      setIsGeneratingImages(true);
      
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
      
      setIsGeneratingImages(false);
    };

    generateMissingImages();
  }, [id, tale]);

  if (!tale) return null;

  const handleNarration = () => {
    const text = tale.content.map(segment => segment.text).join(" ");
    generateNarration(text);
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

      {isGeneratingImages && (
        <div className="text-center text-magical-turquoise">
          Génération des images en cours...
        </div>
      )}

      <TaleStory content={tale.content} title={tale.title} />

      <div className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20">
        <h3 className="text-magical-turquoise font-semibold mb-2">Morale de l'histoire :</h3>
        <p className="text-white/80 italic">{tale.moral}</p>
      </div>
    </motion.div>
  );
};

export default TaleContent;