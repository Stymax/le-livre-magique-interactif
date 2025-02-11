
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";

interface TaleHeaderProps {
  onBack: () => void;
  isPlaying: boolean;
  onNarrationToggle: () => void;
  currentPage?: number;
  totalPages?: number;
}

const TaleHeader = ({ onBack, isPlaying, onNarrationToggle, currentPage = 1, totalPages = 1 }: TaleHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onBack}
        className="text-magical-gold hover:text-magical-gold/80 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        Retour aux contes
      </button>

      <span className="text-magical-gold text-sm">
        Page {currentPage} sur {totalPages}
      </span>

      <button
        onClick={onNarrationToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-magical-gold/20 text-magical-gold hover:bg-magical-gold/30 transition-colors"
      >
        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {isPlaying ? "Arrêter" : "Écouter"}
      </button>
    </div>
  );
};

export default TaleHeader;
