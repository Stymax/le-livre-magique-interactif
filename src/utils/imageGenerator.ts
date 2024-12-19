import { RunwareService } from "./runware";
import { toast } from "sonner";

const runwareService = new RunwareService("Ojr4T1JQ0YgouYCmmIQjzs3vkRYLDjZi");

interface GenerateAndSaveImageProps {
  prompt: string;
  fileName: string;
  title: string;
}

export const generateAndSaveImage = async ({ prompt, fileName, title }: GenerateAndSaveImageProps) => {
  try {
    // Vérifier si l'image existe déjà
    const response = await fetch(`/lovable-uploads/${fileName}`);
    if (response.ok) {
      console.log(`Image ${fileName} already exists`);
      return `/lovable-uploads/${fileName}`;
    }

    // Générer une nouvelle image
    const result = await runwareService.generateImage({
      positivePrompt: prompt,
      model: "runware:100@1",
      numberResults: 1,
      width: 1024,
      height: 1024,
    });

    if (result.imageURL) {
      // Télécharger l'image depuis Runware
      const imageResponse = await fetch(result.imageURL);
      const blob = await imageResponse.blob();

      // Créer un FormData pour envoyer l'image
      const formData = new FormData();
      formData.append('image', blob, fileName);
      formData.append('path', 'lovable-uploads');

      // Envoyer l'image au serveur pour la sauvegarder
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to save image');
      }

      toast.success(`Image générée et sauvegardée pour ${title}`);
      return `/lovable-uploads/${fileName}`;
    }
  } catch (error) {
    console.error('Error generating or saving image:', error);
    toast.error(`Erreur lors de la génération de l'image pour ${title}`);
    return null;
  }
};