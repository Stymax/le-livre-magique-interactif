import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import VirtualKeyboard from "./VirtualKeyboard";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Coins } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  color: string;
  tokens: number;
  avatar_url: string | null;
}

export default function ProfileSelection() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const colors = ["bg-blue-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast.error("Erreur lors du chargement des profils");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProfile = async () => {
    if (profiles.length >= 4) return;
    if (newProfileName.trim()) {
      try {
        const newProfile = {
          name: newProfileName,
          color: colors[profiles.length],
          tokens: 0
        };

        const { data, error } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();

        if (error) throw error;

        setProfiles([...profiles, data]);
        setNewProfileName("");
        setIsCreating(false);
        toast.success("Profil créé avec succès !");
      } catch (error) {
        console.error('Error creating profile:', error);
        toast.error("Erreur lors de la création du profil");
      }
    }
  };

  const selectProfile = async (profile: Profile) => {
    localStorage.setItem("currentProfile", JSON.stringify(profile));
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Qui est-ce ?</h1>
      
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => selectProfile(profile)}
            className="flex flex-col items-center group"
          >
            <div className="relative">
              <Avatar className={`w-24 h-24 ${profile.color} group-hover:ring-2 ring-white transition-all`}>
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="text-2xl">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -bottom-2 right-0 bg-magical-gold text-black text-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                <Coins className="w-4 h-4" />
                {profile.tokens}
              </div>
            </div>
            <span className="mt-2 text-gray-300 group-hover:text-white">
              {profile.name}
            </span>
          </button>
        ))}

        {profiles.length < 4 && !isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex flex-col items-center group"
          >
            <div className="w-24 h-24 rounded-full border-2 border-gray-600 flex items-center justify-center group-hover:border-white transition-all">
              <span className="text-4xl text-gray-600 group-hover:text-white">+</span>
            </div>
            <span className="mt-2 text-gray-600 group-hover:text-white">
              Ajouter un profil
            </span>
          </button>
        )}
      </div>

      {isCreating && (
        <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Créer un nouveau profil</h2>
          <div className="mb-4">
            <input
              type="text"
              value={newProfileName}
              readOnly
              className="w-full bg-gray-800 p-2 rounded"
              placeholder="Nom du profil"
            />
          </div>
          <VirtualKeyboard
            onKeyPress={(key) => {
              if (key === "⌫") {
                setNewProfileName(prev => prev.slice(0, -1));
              } else if (key === "✓") {
                handleAddProfile();
              } else {
                setNewProfileName(prev => prev + key);
              }
            }}
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              onClick={handleAddProfile}
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
              disabled={!newProfileName.trim()}
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}