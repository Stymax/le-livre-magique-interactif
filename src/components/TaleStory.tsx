import { TaleSegment } from "@/types/tale";
import { useState } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
}

const TaleStory = ({ content, title }: TaleStoryProps) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === content.length - 1;

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleReset = () => {
    setCurrentSlide(0);
  };

  return (
    <div className="relative">
      <Carousel 
        className="w-full max-w-4xl mx-auto"
        onSelect={handleSlideChange}
      >
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

        {!isLastSlide ? (
          <>
            <CarouselPrevious className="left-4 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
              <span className="text-magical-gold font-medium">Précédent</span>
            </CarouselPrevious>
            <CarouselNext className="right-4 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
              <span className="text-magical-gold font-medium">Suivant</span>
            </CarouselNext>
          </>
        ) : (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform mb-8">
            <Button
              onClick={handleReset}
              className="bg-magical-gold/20 hover:bg-magical-gold/40 text-magical-gold px-8 py-4 text-lg font-medium"
            >
              Fin - Retour au début
            </Button>
          </div>
        )}
      </Carousel>

      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentSlide + 1} sur {content.length}
      </div>
    </div>
  );
};

export default TaleStory;