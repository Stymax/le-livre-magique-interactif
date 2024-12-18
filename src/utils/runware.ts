import { RunwareService } from "@/types/runware";

const runwareService = new RunwareService("Ojr4T1JQ0YgouYCmmIQjzs3vkRYLDjZi");

export const generateStoryImage = async (prompt: string): Promise<string> => {
  try {
    const result = await runwareService.generateImage({
      positivePrompt: prompt,
      model: "runware:100@1",
      numberResults: 1,
      width: 1024,
      height: 1024,
    });
    return result.imageURL;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};