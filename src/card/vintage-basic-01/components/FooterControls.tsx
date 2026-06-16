import { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, RotateCcw } from 'lucide-react';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

interface FooterControlsProps {
  onClose: () => void;
}

export default function FooterControls({ onClose }: FooterControlsProps) {
  const { config } = useCardConfig();
  const { banner, envelope } = config;
  const musicUrl = optimizeCloudinaryUrl(banner.musicUrl);
  const accentColor = envelope.accentColor || '#C9A84C';
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
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        className="flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105"
        style={{
          width: '40px', height: '40px',
          backgroundColor: '#3D2B1F',
          border: `1px solid ${accentColor}60`,
          color: accentColor,
        }}
      >
        {isPlaying ? (
          <Music className="w-4 h-4" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        ) : (
          <VolumeX className="w-4 h-4 opacity-55" />
        )}
      </button>

      {/* Back to envelope */}
      <button
        onClick={onClose}
        title="Volver al sobre"
        className="flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105"
        style={{
          width: '40px', height: '40px',
          backgroundColor: '#3D2B1F',
          border: `1px solid ${accentColor}60`,
          color: accentColor,
        }}
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
