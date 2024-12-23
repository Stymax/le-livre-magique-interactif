import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstSlide) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentSlide(0);
  };

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {content.map((segment, index) => (
            <CarouselItem key={index} className={`${index === currentSlide ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
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
                  <p className="leading-relaxed text-lg">{segment.text}</p>
                  <div className="flex justify-center gap-4">
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
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 text-center text-magical-gold/60">
        Page {currentSlide + 1} sur {content.length}
      </div>
    </div>
  );
};

export default TaleStory;