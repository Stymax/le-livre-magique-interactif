import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import TaleStory from "./TaleStory";
import TaleHeader from "./tale/TaleHeader";
import TaleMoral from "./tale/TaleMoral";
import TaleAudioManager from "./tale/TaleAudioManager";
import { useTale } from "@/hooks/use-tales";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  
  const { data: tale, isLoading, error } = useTale(id);
  
  useEffect(() => {
    if (error) {
      toast.error("Histoire non trouvée");
      onBack();
    }
  }, [error, onBack]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-magical-gold"></div>
      </div>
    );
  }

  if (!tale) {
    return null;
  }

  const showMoralPage = currentPage === tale.content.length;
  const progress = showMoralPage ? 100 : ((currentPage + 1) / tale.content.length) * 100;

  const handleNarration = async () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
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

      <TaleAudioManager
        id={id}
        currentPage={currentPage}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        contentLength={tale.content.length}
        onPageChange={setCurrentPage}
        onAudioTimeUpdate={setCurrentAudioTime}
      />

      <div className="space-y-4">
        <Progress 
          value={progress} 
          className="h-2 bg-magical-gold/20" 
        />

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