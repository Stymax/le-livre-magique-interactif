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
            <div className="space-y-6">
              <div className="relative w-full h-[400px] mx-auto">
                <img 
                  src="/lovable-uploads/761141cc-ceb1-430d-91d1-9cf151edff86.png"
                  alt="Léa découvrant le livre magique"
                  className="w-full h-full object-contain animate-float"
                />
              </div>
              <p className="text-xl text-white/90">
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
              <div className="relative w-full h-[400px] mx-auto">
                <img 
                  src="/lovable-uploads/2d336b02-5dde-4b75-96f7-ba33c3f66b25.png"
                  alt="La magie du livre s'éveille"
                  className="w-full h-full object-contain animate-float"
                />
              </div>
              <div className="prose prose-invert">
                <p className="text-magical-turquoise text-lg">
                  "Bonjour, jeune aventurier. Oseras-tu découvrir les plus grands contes du monde ?"
                </p>
                <button
                  onClick={() => setIsIntroVisible(true)}
                  className="mt-4 px-6 py-2 bg-magical-turquoise/20 rounded-full text-magical-turquoise hover:bg-magical-turquoise/30 transition-colors duration-300"
                >
                  Retourner à l'accueil
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