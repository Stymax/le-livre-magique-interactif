import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { taleContents } from "@/data/tales";
import { generateAndSaveImage } from "@/utils/imageGenerator";
import { Progress } from "./ui/progress";
import TaleStory from "./TaleStory";
import TaleHeader from "./tale/TaleHeader";
import TaleNavigation from "./tale/TaleNavigation";
import TaleMoral from "./tale/TaleMoral";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const tale = taleContents[id as keyof typeof taleContents];
  const lastPlayedPageRef = useRef(-1);
  const showMoralPage = currentPage === tale.content.length;
  const progress = showMoralPage ? 100 : ((currentPage + 1) / tale.content.length) * 100;

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

  useEffect(() => {
    if (currentAudio) {
      const updateTime = () => {
        setCurrentAudioTime(currentAudio.currentTime);
      };
      currentAudio.addEventListener('timeupdate', updateTime);
      return () => {
        currentAudio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [currentAudio]);

  const playAudioForPage = async (pageIndex: number) => {
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const baseUrl = window.location.origin;
      const isOnMoralPage = pageIndex === tale.content.length;
      const audioPath = isOnMoralPage 
        ? `${baseUrl}/audio/${id}/${id}-moral.mp3`
        : `${baseUrl}/audio/${id}/${id}-${pageIndex + 1}.mp3`;
      
      const audio = new Audio(audioPath);
      
      audio.onended = () => {
        if (isPlaying) {
          if (!isOnMoralPage && pageIndex < tale.content.length - 1) {
            setCurrentPage(pageIndex + 1);
          } else if (!isOnMoralPage) {
            setCurrentPage(tale.content.length);
          } else {
            setIsPlaying(false);
            setCurrentPage(0);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <TaleHeader 
        onBack={onBack}
        isPlaying={isPlaying}
        onNarrationToggle={handleNarration}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-magical-gold">{tale.title}</h2>
          <TaleNavigation
            currentPage={currentPage}
            totalPages={tale.content.length}
            showMoralPage={showMoralPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <Progress 
          value={progress} 
          className="h-2 bg-magical-gold/20" 
        />

        {isGeneratingImages && (
          <div className="text-center text-magical-turquoise animate-pulse">
            Génération des images en cours...
          </div>
        )}

        <div className="space-y-8">
          {!showMoralPage ? (
            <TaleStory 
              content={tale.content} 
              title={tale.title} 
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              isPlaying={isPlaying}
              currentAudioTime={currentAudioTime}
            />
          ) : (
            <TaleMoral moral={tale.moral} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaleContent;