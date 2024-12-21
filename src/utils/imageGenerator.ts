import { toast } from "sonner";

interface GenerateAndSaveImageProps {
  prompt: string;
  fileName: string;
  title: string;
}

export const generateAndSaveImage = async ({ fileName, title }: GenerateAndSaveImageProps) => {
  try {
    // Vérifier si l'image existe déjà
    const response = await fetch(`/lovable-uploads/${fileName}`);
    if (response.ok) {
      console.log(`Image ${fileName} already exists`);
      return `/lovable-uploads/${fileName}`;
    } else {
      toast.error(`Image ${fileName} non trouvée pour ${title}`);
      return null;
    }
  } catch (error) {
    console.error('Error checking image:', error);
    toast.error(`Erreur lors de la vérification de l'image pour ${title}`);
    return null;
  }
};