import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SupabaseTale, SupabaseTaleSegment, Tale } from "@/types/tale";

export const useTale = (id: string) => {
  return useQuery({
    queryKey: ["tale", id],
    queryFn: async (): Promise<Tale | null> => {
      // Fetch tale details
      const { data: tale, error: taleError } = await supabase
        .from("tales")
        .select("*")
        .eq("id", id)
        .single();

      if (taleError) {
        console.error("Error fetching tale:", taleError);
        return null;
      }

      // Fetch tale segments
      const { data: segments, error: segmentsError } = await supabase
        .from("tale_segments")
        .select("*")
        .eq("tale_id", id)
        .order("segment_order", { ascending: true });

      if (segmentsError) {
        console.error("Error fetching tale segments:", segmentsError);
        return null;
      }

      return {
        title: tale.title,
        moral: tale.moral,
        content: segments.map(segment => ({
          text: segment.text,
          image: segment.image
        }))
      };
    }
  });
};

export const useTales = () => {
  return useQuery({
    queryKey: ["tales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tales")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching tales:", error);
        return [];
      }

      return data;
    }
  });
};