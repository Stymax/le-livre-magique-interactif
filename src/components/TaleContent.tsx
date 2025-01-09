import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { taleContents } from "@/data/tales";
import { Progress } from "./ui/progress";
import TaleStory from "./TaleStory";
import TaleHeader from "./tale/TaleHeader";
import TaleNavigation from "./tale/TaleNavigation";
import TaleMoral from "./tale/TaleMoral";
import TaleAudioManager from "./tale/TaleAudioManager";

interface TaleContentProps {
  id: string;
  onBack: () => void;
}

const TaleContent = ({ id, onBack }: TaleContentProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  
  const tale = taleContents[id as keyof typeof taleContents];
  
  useEffect(() => {
    if (!tale) {
      toast.error("Histoire non trouvée");
      onBack();
    }
  }, [tale, onBack]);

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