export interface TaleSegment {
  text: string;
  image?: string;
  imagePrompt?: string;
}

export interface Tale {
  title: string;
  content: TaleSegment[];
  moral: string;
}