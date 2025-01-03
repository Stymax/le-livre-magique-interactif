import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface TaleAudioManagerProps {
  id: string;
  currentPage: number;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  contentLength: number;
  onPageChange: (page: number) => void;
  onAudioTimeUpdate: (time: number) => void;
}

const TaleAudioManager = ({
  id,
  currentPage,
  isPlaying,
  setIsPlaying,
  contentLength,
  onPageChange,
  onAudioTimeUpdate,
}: TaleAudioManagerProps) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const lastPlayedPageRef = useRef(-1);

  useEffect(() => {
    if (isPlaying && currentPage !== lastPlayedPageRef.current) {
      playAudioForPage(currentPage);
    }
  }, [currentPage, isPlaying]);

  useEffect(() => {
    if (currentAudio) {
      const updateTime = () => {
        onAudioTimeUpdate(currentAudio.currentTime);
      };
      currentAudio.addEventListener('timeupdate', updateTime);
      return () => {
        currentAudio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [currentAudio, onAudioTimeUpdate]);

  const playAudioForPage = async (pageIndex: number) => {
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const baseUrl = window.location.origin;
      const isOnMoralPage = pageIndex === contentLength;
      const audioPath = isOnMoralPage 
        ? `${baseUrl}/audio/${id}/${id}-moral.mp3`
        : `${baseUrl}/audio/${id}/${id}-${pageIndex + 1}.mp3`;
      
      const audio = new Audio(audioPath);
      
      audio.onended = () => {
        if (isPlaying) {
          if (!isOnMoralPage && pageIndex < contentLength - 1) {
            onPageChange(pageIndex + 1);
          } else if (!isOnMoralPage) {
            onPageChange(contentLength);
          } else {
            setIsPlaying(false);
            onPageChange(0);
          }
        }
      };

      setCurrentAudio(audio);
      lastPlayedPageRef.current = pageIndex;
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error("Erreur lors de la lecture audio");
      setIsPlaying(false);
    }
  };

  return null;
};

export default TaleAudioManager;