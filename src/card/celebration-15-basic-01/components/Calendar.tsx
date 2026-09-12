import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../celebration15.css';
import calendarImg from '../img/calendar.png';
import calendarCoupleImg from '../img/calendar2.png';

export default function Calendar() {
  const { config } = useCardConfig();
  const { calendar, weddingData, envelope } = config;

  const dateImg = optimizeCloudinaryUrl(calendar.dateImg);
  const accentColor = envelope.accentColor || '#C9A84C';

  const weddingDate = new Date(weddingData.weddingDate);
  const month = weddingDate.getUTCMonth();
  const year = weddingDate.getUTCFullYear();
  const date = weddingDate.getUTCDate();
  const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const blanks: null[] = Array(startingDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allDays = [...blanks, ...days];

  return (
    <section
      className="w-full py-16 md:py-24 px-4 flex flex-col items-center"

    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16"
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-2"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
        >

        </p>
        <h2
          className="text-2xl md:text-3xl italic font-bold"
          style={{ color: calendar.titleTextColor || '#8B6914', fontFamily: calendar.titleTextFont || 'var(--v-font-display)' }}
        >
          {calendar.titleMsgText}
        </h2>
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div style={{ height: '1px', width: '40px', backgroundColor: accentColor, opacity: 0.4 }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="2" fill={accentColor} fillOpacity="0.6" />
            <circle cx="5" cy="5" r="4" fill="none" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.35" />
          </svg>
          <div style={{ height: '1px', width: '40px', backgroundColor: accentColor, opacity: 0.4 }} />
        </div>
      </motion.div>

      <div className="w-full max-w-3xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-row gap-4 sm:gap-8 md:gap-12 items-center justify-center w-full"
        >
          {/* Photo */}
          {dateImg && (
            <div className="flex-1 min-w-0 flex justify-center">
              <div
                className="relative w-full max-w-[340px] aspect-[2/3] flex items-center justify-center"
              >
                {/* Frame Background Image */}
                <img
                  src={calendarCoupleImg}
                  alt="Marco Foto Pareja"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md z-10"
                />

                {/* Couple Photo (rendered inside the vertical oval frame) */}
                <div className="absolute w-[78%] h-[68%] top-[23%] left-[11%]  overflow-hidden flex items-center justify-center z-0">
                  <img
                    src={dateImg}
                    alt="Save the date"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Soft reflection glow on the frame glass */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.15) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Calendar grid */}
          <div className="flex-1 min-w-0 flex justify-center">
            <div
              className="relative w-full max-w-[340px] aspect-[2/3] flex items-center justify-center"
            >
              {/* Frame Background Image */}
              <img
                src={calendarImg}
                alt="Marco Calendario"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md z-10"
              />

              {/* Calendar content container */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-[15%] pb-[10%] px-[12%]">
                {/* Month Name */}
                <span
                  className="text-4xl sm:text-6xl md:text-6xl italic"
                  style={{
                    color: '#8B6914',
                    fontFamily: 'var(--v-font-display)',
                    lineHeight: '1.2',
                    textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.05)'
                  }}
                >
                  {monthNames[month]}
                </span>

                {/* Date Number */}
                <span
                  className="text-4xl sm:text-6xl md:text-8xl font-normal my-1"
                  style={{
                    color: '#8B6914',
                    fontFamily: 'var(--v-font-display)',
                    lineHeight: '1.0',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.08)'
                  }}
                >
                  {date}
                </span>

                {/* Year with "de" */}
                <span
                  className="text-3xl sm:text-3xl md:text-3xl italic"
                  style={{
                    color: '#8B6914',
                    fontFamily: 'var(--v-font-display)',
                    lineHeight: '1.2',
                    textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.05)'
                  }}
                >
                  de {year}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
