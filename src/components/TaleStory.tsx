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
import { Button } from "./ui/button";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
}

const TaleStory = ({ content, title }: TaleStoryProps) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === content.length - 1;

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  const handleSlideChange = (api: any) => {
    const selectedIndex = api?.selectedScrollSnap();
    if (typeof selectedIndex === 'number') {
      setCurrentSlide(selectedIndex);
    }
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

        {isFirstSlide ? (
          <CarouselNext className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
            <span className="text-magical-gold font-medium">Début</span>
          </CarouselNext>
        ) : !isLastSlide ? (
          <>
            <CarouselPrevious className="absolute left-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
              <span className="text-magical-gold font-medium">Retour</span>
            </CarouselPrevious>
            <CarouselNext className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
              <span className="text-magical-gold font-medium">Suivant</span>
            </CarouselNext>
          </>
        ) : (
          <>
            <CarouselPrevious className="absolute left-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
              <span className="text-magical-gold font-medium">Retour</span>
            </CarouselPrevious>
            <Button
              onClick={handleReset}
              className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-24 bg-magical-gold/20 hover:bg-magical-gold/40 text-magical-gold font-medium"
            >
              Fin
            </Button>
          </>
        )}
      </Carousel>

      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentSlide + 1} sur {content.length}
      </div>
    </div>
  );
};

export default TaleStory;