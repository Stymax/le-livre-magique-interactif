import { motion } from "framer-motion";
import { TaleSegment } from "@/types/tale";
import { useState, useEffect } from "react";
import { generateStoryImage } from "@/utils/generateStoryImages";
import { Skeleton } from "@/components/ui/skeleton";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
}

const TaleStory = ({ content, title }: TaleStoryProps) => {
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const generateImages = async () => {
      for (let i = 0; i < content.length; i++) {
        const segment = content[i];
        if (segment.imagePrompt && !generatedImages[i] && !loadingImages[i]) {
          setLoadingImages(prev => ({ ...prev, [i]: true }));
          try {
            const imageUrl = await generateStoryImage(segment.imagePrompt);
            setGeneratedImages(prev => ({ ...prev, [i]: imageUrl }));
          } catch (error) {
            console.error(`Error generating image for ${title}, segment ${i + 1}:`, error);
            setFailedImages(prev => new Set([...prev, i]));
          } finally {
            setLoadingImages(prev => ({ ...prev, [i]: false }));
          }
        }
      }
    };

    generateImages();
  }, [content, title]);

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
    console.error(`Error loading image for ${title}, segment ${index + 1}`);
  };

  return (
    <div className="space-y-12 text-white/90">
      {content.map((segment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-4"
        >
          {loadingImages[index] ? (
            <Skeleton className="w-full h-64 rounded-xl" />
          ) : (
            (generatedImages[index] || segment.image) && !failedImages.has(index) && (
              <img
                src={generatedImages[index] || segment.image}
                alt={`Illustration ${index + 1} de ${title}`}
                className="w-full h-64 object-cover rounded-xl"
                onError={() => handleImageError(index)}
              />
            )
          )}
          <p className="leading-relaxed">{segment.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TaleStory;