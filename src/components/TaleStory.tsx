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
    <div className="relative bg-[url('/lovable-uploads/bg-book.png')] bg-cover bg-center bg-no-repeat p-8">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {content.map((segment, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 h-[calc(100vh-300px)] w-full max-w-6xl px-12">
                {/* Page de gauche */}
                <div className="flex flex-col items-center justify-between px-4 relative custom-padding-left">
                  {/* Titre */}
                  <div className="min-h-[30px] w-full text-center mb-6">
                    {index === 0 && (
                      <h2 className="text-3xl font-bold text-[rgb(171,0,255)] font-gloria">
                        {title}
                      </h2>
                    )}
                  </div>
                  
                  {/* Image */}
                  <div className="flex-1 flex items-center justify-center w-full">
                    <div className="max-w-[80%] h-auto rounded-lg overflow-hidden flex items-center justify-center">
                      {!failedImages.has(index) && (
                        <TaleImage
                          image={segment.image}
                          title={title}
                          index={index}
                          onError={handleImageError}
                        />
                      )}
                    </div>
                  </div>
          
                  {/* Navigation */}
                  <div className="h-[50px] flex items-center justify-center mt-6">
                    {currentPage > 0 && (
                      <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] font-medium"
                      >
                        Retour
                      </Button>
                    )}
                  </div>
                </div>
          
                {/* Page droite */}
                <div className="flex flex-col justify-between px-4 custom-padding-right">
                  <div className="prose prose-invert max-w-none flex-1 overflow-hidden">
                    <div className="h-full text-lg text-[#000000] leading-relaxed overflow-y-auto pr-8">
                      <TaleText
                        text={fullText}
                        highlighted={highlightedText}
                        isPlaying={isPlaying}
                      />
                    </div>
                  </div>
          
                  <div className="h-[50px] flex justify-center space-x-2 items-center mt-6">
                    {currentPage < content.length - 1 && (
                     <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="bg-[rgba(171,0,255,0.2)] hover:bg-[rgba(171,0,255,0.4)] border-[1px] border-[rgb(171,0,255)] rounded text-[rgb(171,0,255)] hover:text-[rgb(172, 170, 173)] hover:text-[rgb(172, 170, 173)] font-medium"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaleStory;