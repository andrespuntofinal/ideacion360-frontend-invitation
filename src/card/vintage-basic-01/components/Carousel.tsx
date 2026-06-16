import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

export default function Carousel() {
  const { config } = useCardConfig();
  const { carousel, envelope } = config;
  const images = ((carousel.images as string[]) || []).map(optimizeCloudinaryUrl);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const accentColor = envelope.accentColor || '#C9A84C';

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, (carousel.autoPlayInterval as number) || 6000);
    return () => clearInterval(timer);
  }, [images.length, carousel.autoPlayInterval]);

  const goTo = (idx: number) => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); };
  const prev = () => { setDirection(-1); setCurrentIndex((p) => (p - 1 + images.length) % images.length); };
  const next = () => { setDirection(1); setCurrentIndex((p) => (p + 1) % images.length); };

  if (images.length === 0) return null;

  return (
    <section
      className="w-full py-16 md:py-24 px-4 flex flex-col items-center"
      style={{ backgroundColor: envelope.cardBackgroundColor || '#F5EFE0' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-14"
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
        >
          Galería
        </p>
        <h2
          className="text-2xl md:text-3xl italic"
          style={{ color: carousel.titleColor || '#8B6914', fontFamily: carousel.titleFont || 'var(--v-font-display)' }}
        >
          {carousel.carouselMsg}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div style={{ height: '1px', width: '40px', backgroundColor: accentColor, opacity: 0.4 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="2" fill={accentColor} fillOpacity="0.6"/>
          </svg>
          <div style={{ height: '1px', width: '40px', backgroundColor: accentColor, opacity: 0.4 }} />
        </div>
      </motion.div>

      {/* Slider */}
      <div className="relative w-full max-w-5xl mx-auto group">
        {/* Vintage photo frame border */}
        <div
          className="relative overflow-hidden aspect-[4/5] sm:aspect-video md:aspect-[16/9]"
          style={{
            outline: `1px solid ${accentColor}30`,
            outlineOffset: '6px',
          }}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1, x: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, scale: 1.04, x: 0 }}
              exit={{ opacity: 0, scale: 1.08, x: direction > 0 ? -30 : 30 }}
              transition={{
                opacity: { duration: 1.4, ease: 'easeInOut' },
                scale: { duration: 10, ease: 'linear' },
                x: { duration: 1.4, ease: [0.32, 0.72, 0, 1] },
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <img
                src={images[currentIndex]}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setSelectedImage(images[currentIndex])}
                referrerPolicy="no-referrer"
                alt={`Imagen ${currentIndex + 1}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(61,43,31,0.35) 100%)',
          }} />

          {/* Nav arrows — vintage style */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  width: '40px', height: '40px',
                  backgroundColor: 'rgba(61,43,31,0.65)',
                  border: `1px solid ${accentColor}50`,
                  color: accentColor,
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  width: '40px', height: '40px',
                  backgroundColor: 'rgba(61,43,31,0.65)',
                  border: `1px solid ${accentColor}50`,
                  color: accentColor,
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots — vintage dashes */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '3px',
                  backgroundColor: accentColor,
                  opacity: i === currentIndex ? 0.9 : 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-5 right-5 flex items-center justify-center transition-colors"
              style={{ width: '40px', height: '40px', color: carousel.buttonCloseColor || '#C9A84C', border: `1px solid ${accentColor}50`, backgroundColor: 'rgba(61,43,31,0.6)' }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              src={selectedImage}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              style={{ outline: `3px solid ${accentColor}30`, outlineOffset: '6px' }}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
