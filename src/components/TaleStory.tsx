import { TaleSegment } from "@/types/tale";
import { useState } from "react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel();
  
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === content.length - 1;

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const handleNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      setCurrentSlide(0);
    }
  };

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <Carousel>
          <CarouselContent>
            {content.map((segment, index) => (
              <CarouselItem key={index}>
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
        </Carousel>
      </div>

      {isFirstSlide && (
        <Button
          onClick={handleNext}
          className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
        >
          Suivant
        </Button>
      )}

      {!isFirstSlide && !isLastSlide && (
        <>
          <Button
            onClick={handlePrevious}
            className="absolute left-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Retour
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Suivant
          </Button>
        </>
      )}

      {isLastSlide && (
        <>
          <Button
            onClick={handlePrevious}
            className="absolute left-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Retour
          </Button>
          <Button
            onClick={handleReset}
            className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Fin
          </Button>
        </>
      )}

      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentSlide + 1} sur {content.length}
      </div>
    </div>
  );
};

export default TaleStory;