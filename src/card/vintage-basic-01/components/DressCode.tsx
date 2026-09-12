import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import '../vintage.css';
import dressCodeWomenImg from '../img/dress-code-women-v3.png';
import dressCodeMenImg from '../img/dress-code-men-v2.png';

export default function DressCode() {
  const { config } = useCardConfig();
  const { dressCode, envelope } = config;
  const accentColor = envelope.accentColor || '#C9A84C';

  const details = [
    {
      title: dressCode.titleWomen || 'Mujeres',
      image: dressCodeWomenImg,
      text: dressCode.dressCodeTextWomen,
      palette: dressCode.colorPaletteWomen,
    },
    {
      title: dressCode.titleMen || 'Hombres',
      image: dressCodeMenImg,
      text: dressCode.dressCodeTextMen,
      palette: dressCode.colorPaletteMen,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 flex flex-col items-center">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
        >
          Indumentaria
        </p>
        <h2
          className="text-2xl md:text-3xl italic"
          style={{ color: dressCode.titleColor || '#8B6914', fontFamily: dressCode.titleFont || 'var(--v-font-display)' }}
        >
          {dressCode.titletext}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div style={{ height: '1px', width: '32px', backgroundColor: accentColor, opacity: 0.4 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="2" fill={accentColor} fillOpacity="0.6" />
          </svg>
          <div style={{ height: '1px', width: '32px', backgroundColor: accentColor, opacity: 0.4 }} />
        </div>
      </motion.div>

      {/* Cards container: side-by-side horizontally on all screens */}
      <div className="w-full max-w-3xl flex flex-row gap-4 sm:gap-8 justify-center items-center">
        {details.map((item, i) => (
          <motion.div

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="flex-1 min-w-0 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              {/* Background Frame Image */}
              <img
                src={item.image}

                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md z-10"
              />

              {/* Card content overlaid on top of the image */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-[8%] text-center">
                {/* Subtitle */}
                <h3
                  className="text-sm sm:text-lg md:text-xl tracking-[0.1em] uppercase font-semibold"
                  style={{ fontFamily: 'var(--v-font-utility)', color: dressCode.title2Color || '#C9A84C' }}
                >
                  {item.title}
                </h3>

                {/* Decorative Separator */}
                <div
                  className="w-[50%] h-[1px] my-1.5 sm:my-2.5"
                  style={{ background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)` }}
                />

                {/* Description */}
                <p
                  className="text-[10px] sm:text-sm md:text-base leading-relaxed px-1 sm:px-2"
                  style={{ color: dressCode.text2Color || '#E8D5A3', fontFamily: 'var(--v-font-body)' }}
                >
                  {item.text}
                </p>

                {/* Color Palette */}
                {dressCode.activateColorPalette && item.palette && item.palette.length > 0 && (
                  <div className="flex flex-col items-center mt-2 sm:mt-3">
                    <span
                      className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
                    >
                      Paleta
                    </span>
                    <div className="flex flex-row gap-1 sm:gap-1.5">
                      {item.palette.map((color, idx) => (
                        <div
                          key={idx}
                          className="rounded-full shadow-sm"
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: color || '#ffffff',
                            border: `1px solid ${accentColor}60`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
