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
        <div className="flex">
          {content.map((segment, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="flex flex-col md:flex-row gap-8 items-start p-4">
                {segment.image && !failedImages.has(index) && (
                  <div className="relative w-full md:w-2/3 aspect-[16/9] rounded-xl overflow-hidden">
                    <img
                      src={segment.image}
                      alt={`Illustration ${index + 1} de ${title}`}
                      className="w-full h-full object-contain"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                )}
                <div className="w-full md:w-1/3 space-y-6">
                  <ScrollArea className="h-[60vh] rounded-md border p-4">
                    <p className="leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: segment.text.replace(/\n/g, "<br>") }}
                    ></p>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentPage + 1} sur {content.length}
      </div>
    </div>
  );
};

export default TaleStory;