import { motion } from 'framer-motion';
import Banner from './Banner';
import Message from './Message';
import Countdown from './Countdown';
import Calendar from './Calendar';
import EventDetails from './EventDetails';
import DressCode from './DressCode';
import ChildRestriction from './ChildRestriction';
import Presents from './Presents';
import Timeline from './Timeline';
import Carousel from './Carousel';
import RSVP from './RSVP';
import FooterControls from './FooterControls';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

interface Landing2Props {
  onClose: () => void;
}

/* ── SVG floral footer ornament ─────────────────────────────────────────── */
const FloralFooter = ({ color = '#C9A84C' }: { color?: string }) => (
  <svg width="220" height="28" viewBox="0 0 220 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="14" x2="88" y2="14" stroke={color} strokeWidth="0.8" strokeOpacity="0.45"/>
    <circle cx="96" cy="14" r="2" fill={color} fillOpacity="0.5"/>
    <path d="M104 8 Q110 14 104 20 Q110 14 116 8 Q110 14 116 20 Q110 14 104 8Z" fill={color} fillOpacity="0.35"/>
    <circle cx="110" cy="14" r="3.5" fill={color} fillOpacity="0.25"/>
    <circle cx="124" cy="14" r="2" fill={color} fillOpacity="0.5"/>
    <line x1="132" y1="14" x2="220" y2="14" stroke={color} strokeWidth="0.8" strokeOpacity="0.45"/>
  </svg>
);

export default function Landing2({ onClose }: Landing2Props) {
  const { config, activeComponents } = useCardConfig();
  const { message, envelope, weddingData } = config;
  const backgroundImage = optimizeCloudinaryUrl(message.backgroundImage);
  const accentColor = envelope.accentColor || '#C9A84C';
  const cardBg = message.backgroundColor || '#F5EFE0';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full relative"
      style={{ backgroundColor: cardBg, fontFamily: 'var(--v-font-body)' }}
    >
      {/* Fixed parchment-like noise overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          backgroundSize: '300px 300px',
          opacity: 0.4,
        }}
      />

      {/* Fixed background image */}
      {backgroundImage && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.28,
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full pb-28 gap-0">
        {/* 1. Banner — full bleed */}
        {activeComponents.banner && <Banner />}

        {/* 2. Message */}
        {activeComponents.message && <Message />}

        {/* 3. Countdown — full bleed gradient */}
        {activeComponents.countdown && <Countdown />}

        {/* 4. Calendar */}
        {activeComponents.calendar && <Calendar />}

        {/* 5 & 6. EventDetails + DressCode */}
        {(activeComponents.eventDetails || activeComponents.dressCode) && (
          <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className={`grid grid-cols-1 ${activeComponents.eventDetails && activeComponents.dressCode ? 'lg:grid-cols-2' : ''} gap-8 md:gap-12`}>
              {activeComponents.eventDetails && <EventDetails />}
              {activeComponents.dressCode && <DressCode />}
            </div>
          </div>
        )}

        {/* 10. Carousel — full bleed */}
        {activeComponents.carousel && <Carousel />}

        {/* 7 & 8. ChildRestriction + Presents */}
        {(activeComponents.childRestriction || activeComponents.presents) && (
          <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className={`grid grid-cols-1 ${activeComponents.childRestriction && activeComponents.presents ? 'lg:grid-cols-2' : ''} gap-8 md:gap-12`}>
              {activeComponents.childRestriction && <ChildRestriction />}
              {activeComponents.presents && <Presents />}
            </div>
          </div>
        )}

        {/* 9. Timeline — full bleed */}
        {activeComponents.timeline && <Timeline />}

        {/* 11. RSVP */}
        {activeComponents.rsvp && <RSVP />}

        {/* ── Vintage Footer ────────────────────────────────────────── */}
        <footer
          className="w-full flex flex-col items-center py-14 px-6 mt-8"
          style={{
            borderTop: `1px solid ${accentColor}30`,
            backgroundColor: `${cardBg}`,
          }}
        >
          <FloralFooter color={accentColor} />
          <h2
            className="text-3xl md:text-4xl italic mt-6 mb-2"
            style={{ color: envelope.textDarkColor || '#3D2B1F', fontFamily: 'var(--v-font-display)' }}
          >
            {weddingData?.coupleNames || ''}
          </h2>
          <div className="mt-2 mb-4">
            <FloralFooter color={accentColor} />
          </div>
          <p
            className="text-sm italic text-center max-w-xs leading-relaxed opacity-65"
            style={{ color: envelope.textDarkColor || '#6B5B4E', fontFamily: 'var(--v-font-body)' }}
          >
            Gracias por ser parte de este capítulo tan especial de nuestras vidas.
          </p>
        </footer>
      </div>

      {/* Floating controls */}
      <FooterControls onClose={onClose} />
    </motion.div>
  );
}
