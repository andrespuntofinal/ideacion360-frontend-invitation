import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function Calendar() {
  const { config } = useCardConfig();
  const { calendar, weddingData } = config;

  const weddingDate = new Date(weddingData.weddingDate);
  const month = weddingDate.getMonth();
  const year = weddingDate.getFullYear();
  const date = weddingDate.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysOfWeek = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'];
  const monthNames = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const blanks: null[] = Array(startingDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allDays = [...blanks, ...days];

  return (
    <section className="w-full md:w-[95%] max-w-7xl mx-auto my-2 md:my-12">
      <h2 className="text-center mb-8 md:mb-16 tracking-widest uppercase text-2xl md:text-3xl"
        style={{ color: calendar.titleTextColor as string, fontFamily: calendar.titleTextFont as string }}>
        {calendar.titleMsgText as string}
      </h2>
      <div className="w-full md:w-[95%] max-w-4xl mx-auto my-4 md:my-12 md:rounded-3xl shadow-xl px-4 md:px-8 overflow-hidden">
        <div className="flex flex-row items-stretch p-4 sm:p-6 md:p-2 gap-4 sm:gap-6 md:gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-3/5 md:w-1/2 relative flex-shrink-0">
            <div className="w-full h-full min-h-[180px] rounded-lg md:rounded-xl overflow-hidden">
              <img src={calendar.dateImg as string} alt="Save the date" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-3/5 md:w-2/3 flex flex-col justify-center py-2 md:py-4">
            <h2 className="text-sm sm:text-lg md:text-2xl tracking-widest uppercase mb-4 md:mb-8 text-center"
              style={{ color: calendar.monthColorText as string, fontFamily: calendar.monthFontText as string }}>
              {monthNames[month]} {year}
            </h2>
            <div className="w-full max-w-sm mx-auto">
              <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2 md:mb-6">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-[10px] tracking-wider sm:text-xs md:text-sm"
                    style={{ color: calendar.dayweekColorText as string, fontFamily: calendar.dayweekFontText as string }}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4 md:gap-y-6 gap-x-1 md:gap-x-2 text-center">
                {allDays.map((d, i) => {
                  const isWeddingDay = d === date;
                  return (
                    <div key={i} className="flex justify-center items-center">
                      {d ? (
                        <div className={`flex items-center justify-center rounded-full transition-all duration-300 ${isWeddingDay ? 'w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 font-bold scale-110 md:scale-125 text-xs sm:text-sm md:text-base' : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[11px] sm:text-xs md:text-sm'}`}
                          style={!isWeddingDay ? { color: calendar.dayColorText1 as string } : { color: calendar.dayColorText2 as string, backgroundColor: calendar.daySelectedColor as string }}>
                          {d}
                        </div>
                      ) : <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
