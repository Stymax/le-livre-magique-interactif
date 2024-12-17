import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useNarration = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const generateNarration = async (text: string) => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": "sk_d8f3096db19a3cca303106ef419242221eaf1e1cc1de5325"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("ElevenLabs API Error:", errorData);
        throw new Error("Erreur lors de la génération de la narration");
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
      };

      setAudio(newAudio);
      await newAudio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Erreur de narration:', error);
      toast({
        title: "Erreur de narration",
        description: error instanceof Error ? error.message : "Erreur inconnue lors de la narration",
        variant: "destructive"
      });
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    generateNarration
  };
};