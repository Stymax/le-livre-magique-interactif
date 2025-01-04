import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import useEmblaCarousel from 'embla-carousel-react';

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousPage, setPreviousPage] = useState(currentPage);

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
      
      // Détection des dialogues (présence de tirets)
      const hasDialogue = text.includes("-");
      // Ajustement de la vitesse en fonction du type de texte
      const charsPerSecond = hasDialogue ? 12 : 18;
      const highlightLength = Math.floor(currentAudioTime * charsPerSecond);
      setHighlightedText(text.substring(0, highlightLength));
    } else {
      setHighlightedText("");
      setFullText(content[currentPage]?.text || "");
    }
  }, [isPlaying, currentPage, content, currentAudioTime]);

  useEffect(() => {
    if (previousPage !== currentPage) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      setPreviousPage(currentPage);
      return () => clearTimeout(timer);
    }
  }, [currentPage, previousPage]);

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const renderText = (text: string, highlighted: string) => {
    if (!isPlaying) return text;

    return (
      <>
        <span className="text-[#8B5CF6] transition-colors duration-300 animate-glow">
          {highlighted}
        </span>
        <span>
          {text.substring(highlighted.length)}
        </span>
      </>
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {content.map((segment, index) => (
            <div 
              key={index} 
              className={`flex-[0_0_100%] min-w-0 ${
                isAnimating && index === previousPage ? 'animate-page-flip-out' : 
                isAnimating && index === currentPage ? 'animate-page-flip-in' : ''
              }`}
            >
              <ScrollArea className="h-[calc(100vh-300px)] rounded-md border p-6">
                <div className="flex">
                  {/* Page de gauche avec l'image */}
                  <div className="w-1/2 pr-4 bg-[url('/lovable-uploads/2f625a67-665e-47d2-8045-482237b03ea0.png')] bg-contain bg-center bg-no-repeat">
                    {segment.image && !failedImages.has(index) && (
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={segment.image}
                          alt={`Illustration ${index + 1} de ${title}`}
                          className="max-w-[80%] rounded-xl shadow-lg"
                          onError={() => handleImageError(index)}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Page de droite avec le texte */}
                  <div className="w-1/2 pl-4 bg-[url('/lovable-uploads/2f625a67-665e-47d2-8045-482237b03ea0.png')] bg-contain bg-center bg-no-repeat">
                    <div className="prose prose-invert max-w-none px-8 py-4">
                      <p className="text-lg leading-relaxed">
                        {renderText(fullText, highlightedText)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaleStory;