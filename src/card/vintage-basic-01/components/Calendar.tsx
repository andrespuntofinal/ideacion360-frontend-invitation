import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

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
      style={{ backgroundColor: calendar.dateImg ? undefined : (envelope.cardBackgroundColor || '#F5EFE0') }}
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
          Save the date
        </p>
        <h2
          className="text-2xl md:text-3xl italic"
          style={{ color: calendar.titleTextColor || '#8B6914', fontFamily: calendar.titleTextFont || 'var(--v-font-display)' }}
        >
          {calendar.titleMsgText}
        </h2>
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div style={{ height: '1px', width: '40px', backgroundColor: accentColor, opacity: 0.4 }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="2" fill={accentColor} fillOpacity="0.6"/>
            <circle cx="5" cy="5" r="4" fill="none" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.35"/>
          </svg>
          <div style={{ height: '1px', width: '40px', backgroundColor: accentColor, opacity: 0.4 }} />
        </div>
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-center w-full"
        >
          {/* Photo */}
          {dateImg && (
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div
                className="relative overflow-hidden aspect-[4/5] shadow-2xl"
                style={{ border: `6px solid ${envelope.photoBackgroundColor || '#ffffff'}`, outline: `1px solid ${accentColor}30` }}
              >
                <img src={dateImg} alt="Save the date" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
              </div>
            </div>
          )}

          {/* Calendar grid */}
          <div className={`flex flex-col items-center ${calendar.dateImg ? 'w-full md:w-3/5' : 'w-full max-w-sm mx-auto'}`}>
            {/* Month / Year header */}
            <h3
              className="text-lg md:text-xl tracking-[0.2em] uppercase font-light mb-2 italic"
              style={{ color: calendar.monthColorText || '#3D2B1F', fontFamily: calendar.monthFontText || 'var(--v-font-display)' }}
            >
              {monthNames[month]} · {year}
            </h3>

            <div
              className="w-full mt-4 p-6"
              style={{
                background: 'rgba(245,239,224,0.9)',
                border: `1px solid ${accentColor}35`,
                boxShadow: '0 2px 16px rgba(61,43,31,0.08), inset 0 0 0 1px rgba(201,168,76,0.08)',
              }}
            >
              {/* Day-of-week header */}
              <div className="grid grid-cols-7 gap-1 w-full text-center mb-3">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-[10px] tracking-wider py-1 font-medium"
                    style={{ color: calendar.dayweekColorText || '#8B6914', fontFamily: 'var(--v-font-utility)' }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {/* Separator */}
              <div className="w-full mb-3" style={{ height: '1px', background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }} />

              {/* Days */}
              <div className="grid grid-cols-7 gap-y-2 gap-x-1 w-full text-center">
                {allDays.map((d, i) => {
                  const isWeddingDay = d === date;
                  return (
                    <div key={i} className="flex justify-center items-center py-0.5">
                      {d ? (
                        <motion.div
                          initial={isWeddingDay ? { scale: 0 } : false}
                          whileInView={isWeddingDay ? { scale: 1 } : {}}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                          className="flex items-center justify-center font-medium transition-all duration-300"
                          style={isWeddingDay ? {
                            width: '36px', height: '36px',
                            backgroundColor: calendar.daySelectedColor || '#3D2B1F',
                            color: calendar.dayColorText2 || '#F5EFE0',
                            fontSize: '0.9rem',
                            boxShadow: `0 0 0 2px ${accentColor}60, 0 2px 8px rgba(61,43,31,0.3)`,
                            fontFamily: 'var(--v-font-display)',
                            fontStyle: 'italic',
                          } : {
                            width: '28px', height: '28px',
                            color: calendar.dayColorText1 || '#9C8778',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--v-font-utility)',
                          }}
                        >
                          {d}
                        </motion.div>
                      ) : <div style={{ width: '28px', height: '28px' }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
