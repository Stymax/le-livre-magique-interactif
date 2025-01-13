import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Coins } from "lucide-react";

interface ShopAvatar {
  id: string;
  name: string;
  image_url: string;
  price: number;
}

interface AvatarShopProps {
  profileId: string;
  currentTokens: number;
  onAvatarPurchased: () => void;
  onClose: () => void;
}

export default function AvatarShop({ profileId, currentTokens, onAvatarPurchased, onClose }: AvatarShopProps) {
  const [avatars, setAvatars] = useState<ShopAvatar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasedAvatars, setPurchasedAvatars] = useState<string[]>([]);

  useEffect(() => {
    fetchAvatars();
    fetchPurchasedAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const { data, error } = await supabase
        .from('shop_avatars')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setAvatars(data || []);
    } catch (error) {
      console.error('Error fetching avatars:', error);
      toast.error("Erreur lors du chargement des avatars");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPurchasedAvatars = async () => {
    try {
      const { data, error } = await supabase
        .from('user_avatars')
        .select('avatar_id')
        .eq('profile_id', profileId);

      if (error) throw error;
      setPurchasedAvatars(data.map(item => item.avatar_id));
    } catch (error) {
      console.error('Error fetching purchased avatars:', error);
    }
  };

  const purchaseAvatar = async (avatar: ShopAvatar) => {
    if (currentTokens < avatar.price) {
      toast.error("Pas assez de jetons !");
      return;
    }

    try {
      const { error: purchaseError } = await supabase
        .from('user_avatars')
        .insert([{
          profile_id: profileId,
          avatar_id: avatar.id
        }]);

      if (purchaseError) throw purchaseError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ tokens: currentTokens - avatar.price })
        .eq('id', profileId);

      if (updateError) throw updateError;

      toast.success("Avatar acheté avec succès !");
      onAvatarPurchased();
      fetchPurchasedAvatars();
    } catch (error) {
      console.error('Error purchasing avatar:', error);
      toast.error("Erreur lors de l'achat de l'avatar");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-magical-gold"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magical-gold">Boutique d'avatars</h2>
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-magical-gold" />
          <span className="text-white">{currentTokens} jetons</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {avatars.map((avatar) => {
          const isPurchased = purchasedAvatars.includes(avatar.id);
          const imageUrl = avatar.image_url.startsWith('http') 
            ? avatar.image_url 
            : avatar.image_url.startsWith('/') 
              ? avatar.image_url 
              : `/${avatar.image_url}`;
          return (
            <div
              key={avatar.id}
              className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={imageUrl}
                alt={avatar.name}
                className="w-24 h-24 rounded-full mb-2 object-cover"
                onError={(e) => {
                  console.error(`Failed to load image: ${imageUrl}`);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              <h3 className="text-white font-medium mb-1">{avatar.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Coins className="w-4 h-4 text-magical-gold" />
                <span className="text-magical-gold">{avatar.price}</span>
              </div>
              <button
                onClick={() => purchaseAvatar(avatar)}
                disabled={isPurchased || currentTokens < avatar.price}
                className={`px-4 py-2 rounded w-full ${
                  isPurchased
                    ? "bg-gray-600 cursor-not-allowed"
                    : currentTokens < avatar.price
                    ? "bg-red-500/50 cursor-not-allowed"
                    : "bg-magical-gold hover:bg-magical-gold/80"
                } transition-colors`}
              >
                {isPurchased ? "Déjà acheté" : "Acheter"}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
      >
        Fermer
      </button>
    </div>
  );
}