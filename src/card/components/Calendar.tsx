import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function Calendar() {
  const { config } = useCardConfig();
  const { calendar, weddingData } = config;

  const weddingDate = new Date(weddingData.weddingDate);
  const month = weddingDate.getUTCMonth();
  const year = weddingDate.getUTCFullYear();
  const date = weddingDate.getUTCDate();
  const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const daysOfWeek = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'];
  const monthNames = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const blanks: null[] = Array(startingDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allDays = [...blanks, ...days];

  return (
    <section className="w-full py-16 md:py-24 px-4 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16"
      >



        <p className="text-sm sm:text-xl font-bold tracking-widest mb-1 uppercase" style={{ color: calendar.titleTextColor, fontFamily: calendar.titleTextFont }}>
          ♥ &nbsp; {calendar.titleMsgText} &nbsp; ♥
        </p>
        <br />
        <br />
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row gap-6 md:gap-10 items-center"
        >
          {/* Photo */}
          {calendar.dateImg && (
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/5]">
                <img
                  src={calendar.dateImg}
                  alt="Save the date"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          )}

          {/* Calendar grid */}
          <div className={`flex flex-col items-center ${calendar.dateImg ? 'w-full md:w-3/5' : 'w-full max-w-md mx-auto'}`}>
            <h2
              className="text-xl md:text-2xl tracking-[0.2em] uppercase font-light mb-6 md:mb-8"
              style={{ color: calendar.monthColorText, fontFamily: calendar.monthFontText }}
            >
              {monthNames[month]} · {year}
            </h2>
            <br />
            <br />
            {/* Day-of-week header */}
            <div className="grid grid-cols-7 gap-1 w-full text-center mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-[10px] md:text-xs tracking-wider py-1 font-medium"
                  style={{ color: calendar.dayweekColorText, fontFamily: calendar.dayweekFontText }}
                >
                  {day}
                </div>
              ))}
            </div>

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
                        className={`flex items-center justify-center rounded-full font-medium transition-all duration-300 ${isWeddingDay
                          ? 'w-9 h-9 md:w-10 md:h-10 text-sm md:text-base shadow-lg ring-2 ring-offset-2'
                          : 'w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm'
                          }`}
                        style={
                          isWeddingDay
                            ? {
                              color: calendar.dayColorText2,
                              backgroundColor: calendar.daySelectedColor,
                            }
                            : { color: calendar.dayColorText1 }
                        }
                      >
                        {d}
                      </motion.div>
                    ) : (
                      <div className="w-7 h-7 md:w-8 md:h-8" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
