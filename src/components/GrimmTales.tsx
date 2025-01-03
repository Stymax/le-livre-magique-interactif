import { motion } from "framer-motion";
import { ChevronLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import TaleContent from "./TaleContent";

const grimmTales = [
  {
    id: "boucles-or",
    title: "Boucles d'or et les trois ours",
    color: "from-amber-500/20 to-amber-700/20"
  },
  {
    id: "hansel-gretel",
    title: "Hansel et Gretel",
    color: "from-emerald-500/20 to-emerald-700/20"
  },
  {
    id: "blanche-neige",
    title: "Blanche-Neige",
    color: "from-red-500/20 to-red-700/20"
  },
  {
    id: "belle-dormant",
    title: "La Belle au bois dormant",
    color: "from-purple-500/20 to-purple-700/20"
  },
  {
    id: "raiponce",
    title: "Raiponce",
    color: "from-yellow-500/20 to-yellow-700/20"
  },
  {
    id: "loup-chevreaux",
    title: "Le loup et les sept chevreaux",
    color: "from-gray-500/20 to-gray-700/20"
  },
  {
    id: "musiciens-breme",
    title: "Les musiciens de Brême",
    color: "from-blue-500/20 to-blue-700/20"
  },
  {
    id: "tom-pouce",
    title: "Tom Pouce",
    color: "from-indigo-500/20 to-indigo-700/20"
  }
];

interface GrimmTalesProps {
  onBack: () => void;
}

const GrimmTales = ({ onBack }: GrimmTalesProps) => {
  const [selectedTale, setSelectedTale] = useState<string | null>(null);

  if (selectedTale) {
    return <TaleContent id={selectedTale} onBack={() => setSelectedTale(null)} />;
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
        {grimmTales.map((tale) => (
          <motion.button
            key={tale.id}
            onClick={() => setSelectedTale(tale.id)}
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl bg-gradient-to-br ${tale.color} border border-white/10 text-left group`}
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