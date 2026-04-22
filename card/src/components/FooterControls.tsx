import { useState, useEffect, useRef } from "react";
import { Music, Music2, X } from "lucide-react";
import { APP_CONFIG } from "../constants";

interface FooterControlsProps {
  onClose: () => void;
}

export default function FooterControls({ onClose }: FooterControlsProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked, waiting for interaction", err);
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <audio ref={audioRef} src={APP_CONFIG.banner.musicUrl} loop />
      
      <button
        onClick={toggleMusic}
        className="w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-stone-800 hover:scale-110 transition-transform"
      >
        {isPlaying ? <Music className="w-6 h-6 animate-pulse" /> : <Music2 className="w-6 h-6 opacity-50" />}
      </button>

      <button
        onClick={onClose}
        className="w-12 h-12 bg-stone-800 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}
