import { TaleSegment } from "@/types/tale";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
}

const TaleStory = ({ content, title }: TaleStoryProps) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    toast.error(`Impossible de charger l'image ${index + 1} pour ${title}`);
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  return (
    <Carousel className="w-full max-w-4xl mx-auto">
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
      
      <CarouselPrevious className="left-2 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
        <ChevronLeft className="w-8 h-8 text-magical-gold" />
      </CarouselPrevious>
      <CarouselNext className="right-2 bg-magical-gold/20 hover:bg-magical-gold/40 border-none">
        <ChevronRight className="w-8 h-8 text-magical-gold" />
      </CarouselNext>
    </Carousel>
  );
};

export default TaleStory;