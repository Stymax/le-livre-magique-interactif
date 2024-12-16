export interface TaleSegment {
  text: string;
  image?: string;
}

export interface Tale {
  title: string;
  content: TaleSegment[];
  moral: string;
}