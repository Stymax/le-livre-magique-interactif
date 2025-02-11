
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import MagicBook from "@/components/MagicBook";
import MagicParticles from "@/components/MagicParticles";
import StorySelection from "@/components/StorySelection";
import LibraryBackground from "@/components/LibraryBackground";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'bookClosed' | 'bookOpen'>('intro');
  const navigate = useNavigate();
  const currentProfileStr = localStorage.getItem("currentProfile");
  const currentProfile = currentProfileStr ? JSON.parse(currentProfileStr) : null;

  useEffect(() => {
    if (!currentProfile) {
      navigate("/profiles");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-magical-gold text-lg">
              Bonjour {currentProfile?.name}
            </div>
            <div className="flex-grow text-center">
              <h1 className="text-2xl font-gloria text-magical-gold">
                Le Livre Magique des Contes
              </h1>
            </div>
            <button
              onClick={() => navigate("/profiles")}
              className="flex items-center gap-2 text-white hover:text-magical-gold transition-colors px-4 py-2 rounded-full border border-white/20 hover:border-magical-gold/50"
            >
              <User className="w-5 h-5" />
              <span>Changer de profil</span>
            </button>
          </div>
        </div>
      </header>

      <LibraryBackground />
      
      <MagicParticles />
      
      <div className="fixed inset-x-0 top-24 left-1/2 -translate-x-1/2 w-[70%] z-10 max-h-[calc(100vh-6rem)] overflow-y-auto mb-[10vh]">
        <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-6">
          {currentStep === 'intro' && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="relative w-full h-[400px] mx-auto overflow-hidden rounded-lg flex justify-center items-center">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/761141cc-ceb1-430d-91d1-9cf151edff86.png"
                    alt="Léa découvrant le livre magique"
                    className="w-auto h-[400px] object-contain animate-float"
                  />
                </div>
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
              <div className="relative w-full h-[400px] mx-auto overflow-hidden rounded-lg flex justify-center items-center">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/2d336b02-5dde-4b75-96f7-ba33c3f66b25.png"
                    alt="La magie du livre s'éveille"
                    className="w-auto h-[400px] object-contain animate-float"
                  />
                </div>
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
