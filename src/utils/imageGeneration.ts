import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateStoryImage = async (prompt: string): Promise<string> => {
  try {
    if (!OPENAI_API_KEY) {
      console.warn("No OpenAI API key found, using fallback images from Unsplash");
      return `https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(prompt)}`;
    }

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
    return `https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(prompt)}`;
  }
};