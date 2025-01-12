import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MagicBook from "@/components/MagicBook";
import MagicParticles from "@/components/MagicParticles";
import StorySelection from "@/components/StorySelection";
import LibraryBackground from "@/components/LibraryBackground";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'bookClosed' | 'bookOpen'>('intro');
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("currentProfile");
    if (!profile) {
      navigate("/profiles");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-950">
      <LibraryBackground />
      
      <MagicParticles />
      
      <div className="fixed inset-x-0 top-0 left-1/2 -translate-x-1/2 w-[70%] z-10 max-h-[95vh] overflow-y-auto mb-[10vh]">
        
        <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div className="flex justify-end p-4">
          <button
            onClick={() => navigate("/profiles")}
            className="text-white hover:text-gray-300 transition-colors"
          >
            Changer de profil
          </button>
        </div>
          <h1 className="text-5xl font-bold text-magical-gold animate-glow text-center mb-6">
            Le Livre Magique des Contes
          </h1>
          
          {currentStep === 'intro' && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="relative w-full h-[400px] mx-auto">
                <img 
                  src="/lovable-uploads/761141cc-ceb1-430d-91d1-9cf151edff86.png"
                  alt="Léa découvrant le livre magique"
                  className="w-full h-full object-contain animate-float"
                />
              </div>
              <p className="text-xl text-white/90 text-center">
                "Dans une vieille bibliothèque, un livre mystérieux attend d'être découvert..."
              </p>
              <button
                onClick={() => setCurrentStep('bookClosed')}
                className="px-8 py-3 bg-magical-gold/20 rounded-full text-magical-gold hover:bg-magical-gold/30 transition-colors duration-300"
              >
                Commencer l'aventure
              </button>
            </div>
          )}

          {currentStep === 'bookClosed' && (
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
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentStep('bookOpen')}
                    className="px-6 py-2 bg-magical-turquoise/20 rounded-full text-magical-turquoise hover:bg-magical-turquoise/30 transition-colors duration-300"
                  >
                    Ouvrir le livre
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'bookOpen' && (
            <div className="animate-fade-in">
              <StorySelection onBack={() => setCurrentStep('bookClosed')} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;