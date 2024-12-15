import { BookOpen, Sparkles } from "lucide-react";

const MagicBook = () => {
  return (
    <div className="relative w-64 h-80 animate-float">
      <div className="absolute inset-0 bg-magical-gold/20 rounded-lg shadow-lg transform -rotate-3">
        <BookOpen className="w-full h-full p-8 text-magical-gold animate-glow" />
      </div>
      <div className="absolute -top-4 -right-4">
        <Sparkles className="w-8 h-8 text-magical-turquoise animate-sparkle" />
      </div>
    </div>
  );
};

export default MagicBook;