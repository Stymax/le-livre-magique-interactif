import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import useEmblaCarousel from 'embla-carousel-react';

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
}

const TaleStory = ({ content, title }: TaleStoryProps) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    skipSnaps: false,
    dragFree: false
  });
  
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === content.length - 1;

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const handleNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  };

  const handlePrevious = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  };

  const handleReset = () => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  };

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <CarouselContent>
          {content.map((segment, index) => (
            <CarouselItem key={index} className="min-w-0">
              <div className="space-y-6 p-4">
                {segment.image && !failedImages.has(index) && (
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                    <img
                      src={segment.image}
                      alt={`Illustration ${index + 1} de ${title}`}
                      className="w-full h-full object-contain"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                )}
                <p className="leading-relaxed text-center text-lg py-4">{segment.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      <div className="flex justify-between mt-4">
        {isFirstSlide ? (
          <div className="w-24" /> // Espace vide pour l'alignement
        ) : (
          <Button
            onClick={handlePrevious}
            className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Retour
          </Button>
        )}

        {isFirstSlide && (
          <Button
            onClick={handleNext}
            className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium ml-auto"
          >
            Suivant
          </Button>
        )}

        {!isFirstSlide && !isLastSlide && (
          <Button
            onClick={handleNext}
            className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Suivant
          </Button>
        )}

        {isLastSlide && (
          <Button
            onClick={handleReset}
            className="h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Fin
          </Button>
        )}
      </div>

      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentSlide + 1} sur {content.length}
      </div>
    </div>
  );
};

export default TaleStory;