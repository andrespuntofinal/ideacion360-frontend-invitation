import { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, RotateCcw } from 'lucide-react';
import { useCardConfig } from '../CardContext';

interface FooterControlsProps {
  onClose: () => void;
}

export default function FooterControls({ onClose }: FooterControlsProps) {
  const { config } = useCardConfig();
  const { banner } = config;
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-5 flex flex-col gap-3 z-50">
      <audio ref={audioRef} src={banner.musicUrl} loop />

      {/* Music button */}
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        className="w-11 h-11 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 border"
        style={{ backgroundColor: '#27272B', borderColor: '#D7B272', color: '#F7F9FA' }}
      >
        {isPlaying ? (
          <Music className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 opacity-60" />
        )}
      </button>

      {/* Back to envelope */}
      <button
        onClick={onClose}
        title="Volver al sobre"
        className="w-11 h-11 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 border"
        style={{ backgroundColor: '#27272B', borderColor: '#D7B272', color: '#F7F9FA' }}
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}
