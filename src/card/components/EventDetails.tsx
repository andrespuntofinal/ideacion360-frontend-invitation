import { motion } from 'framer-motion';
import { Church, PartyPopper, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function EventDetails() {
  const { config } = useCardConfig();
  const { eventDetails } = config;

  const ceremony = eventDetails.ceremony as Record<string, string>;
  const celebration = eventDetails.celebration as Record<string, string>;

  const details = [
    { title: ceremony.title, icon: Church, place: ceremony.place, time: ceremony.time, mapUrl: eventDetails.ceremonyMaps as string },
    { title: celebration.title, icon: PartyPopper, place: celebration.place, time: celebration.time, mapUrl: eventDetails.celebrationMaps as string },
  ];

  return (
    <section className="w-full py-6 md:py-10 px-0 md:px-4">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12"
      >
        <p className="text-sm sm:text-xl font-bold tracking-widest mb-1 uppercase" style={{ color: eventDetails.detailsColor, fontFamily: eventDetails.detailsFont }}>
          {eventDetails.detailsTitle}
        </p>
        <br />
        <br />


      </motion.div>

      {/* Cards */}
      <div className="flex flex-row gap-2 md:gap-6 w-full">
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="relative flex-1 flex flex-col items-center text-center rounded-2xl md:rounded-3xl shadow-xl mt-10"
            style={{
              background: `linear-gradient(160deg, ${eventDetails.backgroundColorFrom}, ${eventDetails.backgroundColorVia}, ${eventDetails.backgroundColorTo})`,
              border: `2px solid ${eventDetails.borderColorIconMoments}`,
            }}
          >
            <div className="w-full px-2 sm:px-6 pt-16 pb-6 flex flex-col items-center flex-1">
              {/* Floating Icon */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl z-20"
                style={{
                  background: eventDetails.backgroundColorIconMoments,
                  border: `3px solid ${eventDetails.borderColorIconMoments}`,
                }}
              >
                <item.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: eventDetails.detailIconColor, opacity: 0.3 }} />
              </div>
              <br />
              <br />

              {/* Title */}
              <h3
                className="text-sm sm:text-xl font-bold tracking-widest mb-1"
                style={{ fontFamily: eventDetails.detailItemTitleFont, color: eventDetails.detailItemTitleColor }}
              >
                {item.title}
              </h3>
              <br />

              <div className="h-px w-16 mb-5" style={{ backgroundColor: eventDetails.borderColorIconMoments }} />

              <div className="space-y-3 w-full mb-6">
                <div
                  className="flex items-center justify-center gap-2 text-sm"
                  style={{ color: eventDetails.detailItemText1Color, fontFamily: eventDetails.detailItemText1Font }}
                >
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4"
                    style={{ color: eventDetails.detailIcon2Color }}
                  />
                  <span className="text-[10px] sm:text-sm leading-snug">{item.place}</span>
                </div>
                <div
                  className="flex items-center justify-center gap-2 sm:gap-2 text-sm"
                  style={{ color: eventDetails.detailItemText1Color, fontFamily: eventDetails.detailItemText1Font }}
                >
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4"
                    style={{ color: eventDetails.detailIcon2Color }}
                  />
                  <span className="text-[10px] sm:text-sm leading-snug">{item.time}</span>
                </div>
              </div>
              <br />

              {/* Map link */}
              {item.mapUrl && (
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    border: `1px solid ${eventDetails.borderColorIconMoments}`,
                    color: eventDetails.detailItemTitleColor,
                    backgroundColor: `${eventDetails.backgroundColorIconMoments}60`,
                  }}
                >

                  <ExternalLink className="w-3 h-3" />
                  {eventDetails.detailsMapsTitle}
                </a>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
