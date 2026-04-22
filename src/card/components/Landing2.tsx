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

interface Landing2Props {
  onClose: () => void;
}

export default function Landing2({ onClose }: Landing2Props) {
  const { config, activeComponents } = useCardConfig();
  const { message } = config;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full relative"
      style={{ backgroundColor: message.backgroundColor }}
    >
      {/* Fixed background image */}
      {message.backgroundImage && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${message.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.12,
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full pb-28 gap-12 md:gap-20">

        {/* 1. Banner — full bleed */}
        {activeComponents.banner && <Banner />}

        {/* 2. Message */}
        {activeComponents.message && <Message />}

        {/* 3. Countdown — full bleed gradient */}
        {activeComponents.countdown && <Countdown />}

        {/* 4. Calendar */}
        {activeComponents.calendar && <Calendar />}

        {/* 5 & 6. EventDetails + DressCode — side by side on large screens */}
        {(activeComponents.eventDetails || activeComponents.dressCode) && (
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className={`grid grid-cols-1 ${activeComponents.eventDetails && activeComponents.dressCode ? 'lg:grid-cols-2' : ''} gap-10 md:gap-14`}>
              {activeComponents.eventDetails && <EventDetails />}
              {activeComponents.dressCode && <DressCode />}
            </div>
          </div>
        )}

        {/* 7 & 8. ChildRestriction + Presents — side by side on large screens */}
        {(activeComponents.childRestriction || activeComponents.presents) && (
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className={`grid grid-cols-1 ${activeComponents.childRestriction && activeComponents.presents ? 'lg:grid-cols-2' : ''} gap-10 md:gap-14`}>
              {activeComponents.childRestriction && <ChildRestriction />}
              {activeComponents.presents && <Presents />}
            </div>
          </div>
        )}

        {/* 9. Timeline — full bleed */}
        {activeComponents.timeline && <Timeline />}

        {/* 10. Carousel — full bleed */}
        {activeComponents.carousel && <Carousel />}

        {/* 11. RSVP */}
        {activeComponents.rsvp && <RSVP />}
      </div>

      {/* Floating controls */}
      <FooterControls onClose={onClose} />
    </motion.div>
  );
}
