import { useState } from "react";
import MagicBook from "@/components/MagicBook";
import MagicParticles from "@/components/MagicParticles";

const Index = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-magical-blue to-black relative overflow-hidden">
      <MagicParticles />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-magical-gold animate-glow">
            Le Livre Magique des Contes
          </h1>
          
          {isIntroVisible ? (
            <div className="space-y-6 text-white/90">
              <p className="text-xl">
                "Dans une vieille bibliothèque, un livre mystérieux attend d'être découvert..."
              </p>
              <button
                onClick={() => setIsIntroVisible(false)}
                className="px-8 py-3 bg-magical-gold/20 rounded-full text-magical-gold hover:bg-magical-gold/30 transition-colors duration-300"
              >
                Commencer l'aventure
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-8 animate-fade-in">
              <MagicBook />
              <div className="prose prose-invert">
                <p className="text-magical-turquoise text-lg">
                  "Bonjour, jeune aventurier. Oseras-tu découvrir les plus grands contes du monde ?"
                </p>
                <button
                  onClick={() => setIsIntroVisible(true)}
                  className="mt-4 px-6 py-2 bg-magical-turquoise/20 rounded-full text-magical-turquoise hover:bg-magical-turquoise/30 transition-colors duration-300"
                >
                  Ouvrir le livre
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;