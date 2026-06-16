import { motion } from 'framer-motion';
import { Church, PartyPopper, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useCardConfig } from '../CardContext';
import '../vintage.css';

export default function EventDetails() {
  const { config } = useCardConfig();
  const { eventDetails, envelope } = config;
  const accentColor = envelope.accentColor || '#C9A84C';

  const ceremony = eventDetails.ceremony as Record<string, string>;
  const celebration = eventDetails.celebration as Record<string, string>;

  const details = [
    { title: ceremony?.title, icon: Church, place: ceremony?.place, time: ceremony?.time, mapUrl: eventDetails.ceremonyMaps as string },
    { title: celebration?.title, icon: PartyPopper, place: celebration?.place, time: celebration?.time, mapUrl: eventDetails.celebrationMaps as string },
  ].filter(item => item.title && item.title.trim() !== '');

  return (
    <section className="w-full py-4 md:py-6 px-0 md:px-2">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
        >
          Celebración
        </p>
        <h2
          className="text-2xl md:text-3xl italic"
          style={{ color: eventDetails.detailsColor || '#8B6914', fontFamily: eventDetails.detailsFont || 'var(--v-font-display)' }}
        >
          {eventDetails.detailsTitle}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div style={{ height: '1px', width: '32px', backgroundColor: accentColor, opacity: 0.4 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="2" fill={accentColor} fillOpacity="0.6"/>
          </svg>
          <div style={{ height: '1px', width: '32px', backgroundColor: accentColor, opacity: 0.4 }} />
        </div>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-5 w-full">
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: i * 0.12, duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
            className="relative v-corner-card"
            style={{
              background: `linear-gradient(160deg, ${eventDetails.backgroundColorFrom || '#2C1F14'}, ${eventDetails.backgroundColorVia || '#4A3728'}, ${eventDetails.backgroundColorTo || '#3D2B1F'})`,
              border: `1px solid ${accentColor}40`,
              padding: '2rem 1.5rem 1.75rem',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-8 right-8"
              style={{ height: '1px', background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)` }}
            />

            {/* Icon + title row */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '40px', height: '40px',
                  backgroundColor: eventDetails.backgroundColorIconMoments || '#4A3728',
                  border: `1px solid ${accentColor}50`,
                }}
              >
                <item.icon
                  className="w-5 h-5"
                  style={{ color: eventDetails.detailIconColor || '#C9A84C', opacity: 0.8 }}
                />
              </div>
              <h3
                className="text-base tracking-[0.1em] uppercase font-medium"
                style={{ fontFamily: 'var(--v-font-utility)', color: eventDetails.detailItemTitleColor || '#C9A84C' }}
              >
                {item.title}
              </h3>
            </div>

            {/* Separator */}
            <div
              className="mb-4"
              style={{ height: '1px', background: `linear-gradient(to right, ${accentColor}40, transparent)` }}
            />

            {/* Details */}
            <div className="space-y-3">
              {item.place && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accentColor, opacity: 0.6 }} />
                  <p
                    className="text-sm leading-snug"
                    style={{ color: eventDetails.detailItemText1Color || '#E8D5A3', fontFamily: 'var(--v-font-body)' }}
                  >
                    {item.place}
                  </p>
                </div>
              )}
              {item.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentColor, opacity: 0.6 }} />
                  <p
                    className="text-sm"
                    style={{ color: eventDetails.detailItemText1Color || '#E8D5A3', fontFamily: 'var(--v-font-body)' }}
                  >
                    {item.time}
                  </p>
                </div>
              )}
            </div>

            {/* Map link */}
            {item.mapUrl && (
              <a
                href={item.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
                style={{
                  color: accentColor,
                  fontFamily: 'var(--v-font-utility)',
                  borderBottom: `1px solid ${accentColor}50`,
                  paddingBottom: '2px',
                }}
              >
                <ExternalLink className="w-3 h-3" />
                {eventDetails.detailsMapsTitle || 'Cómo llegar'}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
