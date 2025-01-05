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

  const renderText = (text: string, highlighted: string) => {
    if (!isPlaying) {
      // Diviser le texte en lignes et gérer les retours à la ligne
      return text.split('\\n').map((line, index) => (
        <div key={index} className="mb-4 whitespace-pre-line">
          {line.trim()}
        </div>
      ));
    }

    const highlightedLines = highlighted.split('\\n');
    const fullLines = text.split('\\n');
    
    return fullLines.map((line, index) => {
      const highlightedPart = highlightedLines[index] || '';
      const remainingPart = line.substring(highlightedPart.length);
      
      return (
        <div key={index} className="mb-4 whitespace-pre-line">
          <span className="text-[#8B5CF6] transition-colors duration-300 animate-glow">
            {highlightedPart}
          </span>
          <span>
            {remainingPart}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="relative bg-[url('/lovable-uploads/bg-book.png')] bg-cover bg-center bg-no-repeat">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {content.map((segment, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="grid grid-cols-2 gap-4 h-[calc(100vh-300px)] px-12">
                {/* Page de gauche - Image */}
                <div className="flex items-center justify-center p-4">
                  {segment.image && !failedImages.has(index) && (
                    <div className="max-w-[80%] h-full flex items-center">
                      <img
                        src={segment.image}
                        alt={`Illustration ${index + 1} de ${title}`}
                        className="rounded-xl max-h-[90%] w-auto object-contain mx-auto"
                        onError={() => handleImageError(index)}
                      />
                    </div>
                  )}
                </div>

                {/* Page de droite - Texte */}
                <div className="flex items-center">
                  <ScrollArea className="p-4 mr-8 h-[80%]">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-lg text-[#000000] leading-relaxed">
                        {renderText(fullText, highlightedText)}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaleStory;