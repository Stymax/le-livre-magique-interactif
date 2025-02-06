import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
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
  const totalSteps = tale.content.length + 1; // +1 pour la page morale

  const getProgressColor = (percentage: number) => {
    if (percentage <= 25) return "bg-[#7FFF00]"; // Vert lime
    if (percentage <= 50) return "bg-[#FFD700]"; // Jaune doré
    if (percentage <= 75) return "bg-[#FFA500]"; // Orange
    return "bg-[#FF4500]"; // Orange foncé
  };

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
        <div className="relative">
          <div className="flex justify-between mb-2">
            <span className="text-magical-gold text-sm">
              Page {currentPage + 1} sur {totalSteps}
            </span>
            <span className="text-magical-gold text-sm">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden flex">
            {[25, 50, 75, 100].map((threshold, index) => {
              const isActive = progress >= threshold;
              const prevThreshold = index === 0 ? 0 : [25, 50, 75, 100][index - 1];
              const width = Math.min(Math.max(progress - prevThreshold, 0), threshold - prevThreshold);
              
              return (
                <div
                  key={threshold}
                  className={`${getProgressColor(threshold)} transition-all duration-300`}
                  style={{
                    width: `${25}%`,
                    opacity: isActive ? 1 : 0.2
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: 4 }).map((_, index) => {
              const stepProgress = (index + 1) * 25;
              return (
                <div
                  key={index}
                  className={`text-xs ${
                    progress >= stepProgress ? "text-magical-gold" : "text-magical-gold/40"
                  }`}
                >
                  {stepProgress}%
                </div>
              );
            })}
          </div>
        </div>

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