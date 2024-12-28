import { Sparkles, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import GrimmTales from "./GrimmTales";

interface StorySelectionProps {
  onBack: () => void;
}

const storyOptions = [
  {
    id: "grimm",
    name: "Frères Grimm",
    description: "Contes de l'Allemagne mystérieuse",
    color: "from-purple-500/20 to-purple-700/20"
  },
  {
    id: "andersen",
    name: "Hans Christian Andersen",
    description: "Contes du Danemark enchanteur",
    color: "from-blue-500/20 to-blue-700/20"
  },
  {
    id: "perrault",
    name: "Charles Perrault",
    description: "Contes de la France magique",
    color: "from-red-500/20 to-red-700/20"
  },
  {
    id: "afrique",
    name: "Contes d'Afrique",
    description: "Sagesse et magie du continent africain",
    color: "from-yellow-500/20 to-yellow-700/20"
  }
];

const StorySelection = ({ onBack }: StorySelectionProps) => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  if (selectedCollection === "grimm") {
    return <GrimmTales onBack={() => setSelectedCollection(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="relative mb-6">
          <button
            onClick={onBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-magical-gold hover:text-magical-gold/80 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
            <span className="text-lg font-medium">Retour</span>
          </button>
        </div>
        <p className="text-2xl text-magical-turquoise mb-8 text-center">
          "Chaque histoire te réserve une surprise. Où veux-tu commencer ?"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storyOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setSelectedCollection(option.id)}
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl bg-gradient-to-br ${option.color} border border-white/10 text-left group`}
          >
            <Sparkles className="absolute top-4 right-4 w-5 h-5 text-magical-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-semibold text-white mb-2">{option.name}</h3>
            <p className="text-white/80">{option.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          Collecte des jetons magiques en découvrant chaque histoire !
        </p>
      </div>
    </div>
  );
};

export default StorySelection;