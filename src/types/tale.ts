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

export interface SupabaseTale {
  id: string;
  title: string;
  moral: string;
  created_at: string;
}

export interface SupabaseTaleSegment {
  id: string;
  tale_id: string;
  text: string;
  image: string;
  segment_order: number;
  created_at: string;
}