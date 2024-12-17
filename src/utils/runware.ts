import { RunwareService, GenerateImageParams } from "@/types/runware";

const runwareService = new RunwareService("Gw1IoDST4VnjEt4xg8N6JXF9QdlY55mk");

export const generateStoryImage = async (prompt: string): Promise<string> => {
  try {
    const params: GenerateImageParams = {
      positivePrompt: prompt,
      model: "runware:100@1",
      numberResults: 1,
      width: 1024,
      height: 1024,
    };

    const result = await runwareService.generateImage(params);
    return result.imageURL;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};