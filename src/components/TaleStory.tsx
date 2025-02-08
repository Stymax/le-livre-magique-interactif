
import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import TaleImage from "./tale/TaleImage";
import TaleText from "./tale/TaleText";
import { Button } from "./ui/button";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  isPlaying?: boolean;
  currentAudioTime?: number;
}

const TaleStory = ({ 
  content, 
  title, 
  currentPage, 
  onPageChange,
  isPlaying = false,
  currentAudioTime = 0
}: TaleStoryProps) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [highlightedText, setHighlightedText] = useState("");
  const [fullText, setFullText] = useState("");

  useEffect(() => {
    if (isPlaying && content[currentPage]) {
      const text = content[currentPage].text;
      setFullText(text);
      
      const hasDialogue = text.includes("-");
      const charsPerSecond = hasDialogue ? 12 : 18;
      const highlightLength = Math.floor(currentAudioTime * charsPerSecond);
      setHighlightedText(text.substring(0, highlightLength));
    } else {
      setHighlightedText("");
      setFullText(content[currentPage]?.text || "");
    }
  }, [isPlaying, currentPage, content, currentAudioTime]);

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const segment = content[currentPage];

  return (
    <div className="book-wrapper">
      <div className="book">
        {/* Left page */}
        <div 
          className="page page-left"
          style={{
            backgroundImage: segment?.image ? `url(${segment.image.startsWith('/') ? segment.image : `/${segment.image}`})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="stack-left"></div>
          <div className="min-h-[30px] w-full text-center mb-6 relative z-10">
            {currentPage === 0 && (
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-gloria">
                {title}
              </h2>
            )}
          </div>
          
          <div className="h-[50px] flex items-center justify-center mt-6 relative z-10">
            {currentPage > 0 && (
              <Button
                onClick={() => onPageChange(currentPage - 1)}
                className="bg-white/20 hover:bg-white/40 border-[1px] border-white rounded text-white hover:text-white/80 font-medium"
              >
                Retour
              </Button>
            )}
          </div>
        </div>

        <div className="binding"></div>
  
        {/* Right page */}
        <div className="page page-right">
          <div className="stack-right"></div>
          <div className="prose max-w-none flex-1 overflow-hidden">
            <div className="h-full text-lg text-[#333333] leading-relaxed overflow-y-auto pr-8">
              {segment && (
                <TaleText
                  text={fullText}
                  highlighted={highlightedText}
                  isPlaying={isPlaying}
                />
              )}
            </div>
          </div>
  
          <div className="h-[50px] flex justify-center space-x-2 items-center mt-6">
            {currentPage < content.length - 1 && (
              <Button
                onClick={() => onPageChange(currentPage + 1)}
                className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
              >
                Suivant
              </Button>
            )}
  
            {currentPage === content.length - 1 && (
              <Button
                onClick={() => onPageChange(content.length)}
                className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
              >
                Voir la morale
              </Button>
            )}
  
            {currentPage === content.length && (
              <Button
                onClick={() => onPageChange(0)}
                className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
              >
                Début
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaleStory;
