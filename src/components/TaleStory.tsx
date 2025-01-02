import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TaleStory = ({ content, title, currentPage, onPageChange }: TaleStoryProps) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: currentPage });

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

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const handleNext = () => {
    if (emblaApi && emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    }
  };

  const handlePrevious = () => {
    if (emblaApi && emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
    }
  };

  const handleReset = () => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  };

  const isFirstSlide = currentPage === 0;
  const isLastSlide = currentPage === content.length - 1;

  return (
    
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentPage + 1} sur {content.length}
      </div>
        <div className="flex">
          {content.map((segment, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <ScrollArea className="h-[calc(100vh-300px)] rounded-md border p-6">
                <div className="prose prose-invert max-w-none">
                  {segment.image && !failedImages.has(index) && (
                    <div className="float-left mr-6 mb-4 w-1/2">
                      <img
                        src={segment.image}
                        alt={`Illustration ${index + 1} de ${title}`}
                        className="rounded-xl"
                        onError={() => handleImageError(index)}
                      />
                    </div>
                  )}
                  <p className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: segment.text.replace(/\n/g, "<br>") }}
                  ></p>
                </div>
              </ScrollArea>

              <div className="flex justify-center gap-4 mt-4">
                {!isFirstSlide && (
                  <Button
                    onClick={handlePrevious}
                    className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
                  >
                    <ChevronLeft className="mr-2" />
                    Retour
                  </Button>
                )}
                {!isLastSlide && (
                  <Button
                    onClick={handleNext}
                    className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
                  >
                    Suivant
                    <ChevronRight className="ml-2" />
                  </Button>
                )}
                {isLastSlide && (
                  <Button
                    onClick={handleReset}
                    className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
                  >
                    Début
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default TaleStory;