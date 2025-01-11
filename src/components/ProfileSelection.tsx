import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import VirtualKeyboard from "./VirtualKeyboard";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: number;
  name: string;
  color: string;
}

export default function ProfileSelection() {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem("profiles");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const navigate = useNavigate();

  const colors = ["bg-blue-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];

  const handleAddProfile = () => {
    if (profiles.length >= 4) return;
    if (newProfileName.trim()) {
      const newProfile = {
        id: Date.now(),
        name: newProfileName,
        color: colors[profiles.length],
      };
      const updatedProfiles = [...profiles, newProfile];
      setProfiles(updatedProfiles);
      localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
      setNewProfileName("");
      setIsCreating(false);
    }
  };

  const selectProfile = (profile: Profile) => {
    localStorage.setItem("currentProfile", JSON.stringify(profile));
    // Forcer la navigation vers la page d'accueil
    window.location.href = "/";
  };

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
            <Avatar className={`w-24 h-24 ${profile.color} group-hover:ring-2 ring-white transition-all`}>
              <AvatarFallback className="text-2xl">
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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