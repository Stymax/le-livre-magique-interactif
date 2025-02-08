
import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
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
  if (!segment) return null;

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-[50vh] md:h-[60vh] bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{
          backgroundImage: !failedImages.has(currentPage) && segment.image ? 
            `url(${segment.image.startsWith('/') ? segment.image : `/${segment.image}`})` : 
            'none',
          opacity: 0.3
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Title Section */}
        {currentPage === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(171,0,255)] font-gloria">
              {title}
            </h2>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-end justify-center">
          {/* Text Content */}
          <div className="w-full md:w-2/3 lg:w-1/2 bg-white/90 rounded-xl p-6 shadow-lg ml-auto">
            <div className="prose max-w-none">
              <div className="text-lg text-[#333333] leading-relaxed">
                <TaleText
                  text={fullText}
                  highlighted={highlightedText}
                  isPlaying={isPlaying}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {currentPage > 0 && (
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
            >
              Retour
            </Button>
          )}

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
  );
};

export default TaleStory;

