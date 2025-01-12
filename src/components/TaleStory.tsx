import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import useEmblaCarousel from 'embla-carousel-react';
import TaleImage from "./tale/TaleImage";
import TaleText from "./tale/TaleText";

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
    <div className="relative bg-[url('/lovable-uploads/bg-book.png')] bg-cover bg-center bg-no-repeat h-screen">
    <div className="overflow-hidden h-full" ref={emblaRef}>
      <div className="flex h-full">
        {content.map((segment, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
            <div className="grid grid-cols-2 gap-4 h-full px-12">
              {/* Colonne Image */}
              <div className="flex items-center justify-center p-4">
                {!failedImages.has(index) && (
                  <div className="flex items-center justify-center max-w-full max-h-full">
                    <TaleImage
                      image={segment.image}
                      title={title}
                      index={index}
                      onError={handleImageError}
                    />
                  </div>
                )}
              </div>
  
              {/* Colonne Texte */}
              <div className="flex items-center justify-center">
                <div className="p-4 h-[80%] w-full flex items-center">
                  <div className="prose prose-invert max-w-none text-center">
                    <div className="text-lg text-[#000000] leading-relaxed">
                      <TaleText
                        text={fullText}
                        highlighted={highlightedText}
                        isPlaying={isPlaying}
                      />
                    </div>
                  </div>
                </div>
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