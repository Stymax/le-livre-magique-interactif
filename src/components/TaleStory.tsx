import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import useEmblaCarousel from 'embla-carousel-react';

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

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaleStory;