import { motion } from "framer-motion";
import { TaleSegment } from "@/types/tale";

interface TaleStoryProps {
  content: TaleSegment[];
  title: string;
}

const TaleStory = ({ content, title }: TaleStoryProps) => {
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
          {segment.image && (
            <div className="relative w-full h-64">
              <img
                src={segment.image}
                alt={`Illustration ${index + 1} de ${title}`}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  console.error(`Error loading image for ${title}, segment ${index + 1}`);
                  e.currentTarget.style.display = 'none';
                }}
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