import { motion } from "framer-motion";
import { ChevronLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import TaleContent from "./TaleContent";
import { useTales } from "@/hooks/use-tales";

interface GrimmTalesProps {
  onBack: () => void;
}

const GrimmTales = ({ onBack }: GrimmTalesProps) => {
  const [selectedTale, setSelectedTale] = useState<string | null>(null);
  const { data: tales, isLoading } = useTales();

  if (selectedTale) {
    return <TaleContent id={selectedTale} onBack={() => setSelectedTale(null)} />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-magical-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-magical-gold hover:text-magical-gold/80 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
         Retour aux collections
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tales?.map((tale) => (
          <motion.button
            key={tale.id}
            onClick={() => setSelectedTale(tale.id)}
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-white/10 text-left group`}
          >
            <Sparkles className="absolute top-4 right-4 w-5 h-5 text-magical-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-semibold text-white">{tale.title}</h3>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          Chaque conte contient une leçon précieuse et un jeton magique à collecter !
        </p>
      </div>
    </div>
  );
};

export default GrimmTales;