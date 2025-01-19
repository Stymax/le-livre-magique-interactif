import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import useEmblaCarousel from 'embla-carousel-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: currentPage });
  const [highlightedText, setHighlightedText] = useState("");
  const [fullText, setFullText] = useState("");
 
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentPage);
    }
  }, [currentPage, emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        onPageChange(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi, onPageChange]);

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

  return (
    <div className="book-wrapper">
      <div className="book" ref={emblaRef}>
        {content.map((segment, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 flex items-center justify-center">
            {/* Page gauche */}
            <div className="page page-left">
              <div className="stack-left"></div>
              {index === 0 && (
                <h2 className="text-3xl font-bold text-[rgb(171,0,255)] font-gloria">
                  {title}
                </h2>
              )}
              {/* Image */}
              <div className="image-placeholder">
                {!failedImages.has(index) && (
                  <TaleImage
                    image={segment.image}
                    title={title}
                    index={index}
                    onError={handleImageError}
                  />
                )}
              </div>
              {/* Bouton Retour */}
              {currentPage > 0 && (
                <div className="h-[50px] flex items-center justify-center mt-6">
                  <Button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
                  >
                    Retour
                  </Button>
                </div>
              )}
            </div>
            {/* Reliure */}
            <div className="binding"></div>
            {/* Page droite */}
            <div className="page page-right">
              <div className="stack-right"></div>
              <div className="text-content">
                <TaleText
                  text={fullText}
                  highlighted={highlightedText}
                  isPlaying={isPlaying}
                />
              </div>
              {/* Boutons de navigation */}
              <div className="h-[50px] flex justify-center space-x-2 items-center mt-6">
                {currentPage < content.length - 1 ? (
                  <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
                  >
                    Suivant
                  </Button>
                ) : (
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
        ))}
      </div>
    </div>
  );
};

export default TaleStory;