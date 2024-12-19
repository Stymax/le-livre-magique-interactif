import { motion } from "framer-motion";
import { TaleSegment } from "@/types/tale";
import { useState } from "react";
import { toast } from "sonner";

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
    <div className="space-y-12 text-white/90">
      {content.map((segment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-4"
        >
          {segment.image && !failedImages.has(index) && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-magical-gold/10">
              <img
                src={segment.image}
                alt={`Illustration ${index + 1} de ${title}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
            </div>
          )}
          <p className="leading-relaxed">{segment.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TaleStory;