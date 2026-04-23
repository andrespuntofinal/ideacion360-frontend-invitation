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
        <p className="text-base sm:text-lg tracking-widest uppercase mb-2" style={{ color: eventDetails.detailsColor, fontFamily: eventDetails.detailsFont }}>
          {eventDetails.detailsTitle}
        </p>
        <br />


      </motion.div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="flex-1 flex flex-col items-center text-center rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
            style={{
              background: `linear-gradient(160deg, ${eventDetails.backgroundColorFrom}, ${eventDetails.backgroundColorVia}, ${eventDetails.backgroundColorTo})`,
              border: `1px solid ${eventDetails.boderColor}`,
            }}
          >
            <div className="w-full px-6 pt-8 pb-6 flex flex-col items-center flex-1">
              {/* Icon */}
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-5 shadow-lg"
                style={{
                  background: eventDetails.backgroundColorIconMoments,
                  border: `2px solid ${eventDetails.borderColorIconMoments}`,
                }}
              >
                <item.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: eventDetails.detailIconColor }} />
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-xl font-medium mb-5 tracking-wide"
                style={{ fontFamily: eventDetails.detailItemTitleFont, color: eventDetails.detailItemTitleColor }}
              >
                {item.title}
              </h3>

              {/* Divider */}
              <div className="h-px w-16 mb-5" style={{ backgroundColor: eventDetails.borderColorIconMoments, opacity: 0.4 }} />

              {/* Details */}
              <div className="space-y-3 w-full mb-6">
                <div
                  className="flex items-center justify-center gap-2 text-sm"
                  style={{ color: eventDetails.detailItemText1Color, fontFamily: eventDetails.detailItemText1Font }}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: eventDetails.detailIcon2Color }} />
                  <span className="leading-snug">{item.place}</span>
                </div>
                <div
                  className="flex items-center justify-center gap-2 text-sm"
                  style={{ color: eventDetails.detailItemText1Color, fontFamily: eventDetails.detailItemText1Font }}
                >
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: eventDetails.detailIcon2Color }} />
                  <span>{item.time}</span>
                </div>
              </div>

              {/* Map link */}
              {item.mapUrl && (
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    border: `1px solid ${eventDetails.borderColorIconMoments}`,
                    color: eventDetails.detailItemTitleColor,
                    backgroundColor: `${eventDetails.backgroundColorIconMoments}60`,
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
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
