import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateStoryImage = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    return response.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    // Retourner une image par défaut d'Unsplash en cas d'erreur
    return `https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(prompt)}`;
  }
};