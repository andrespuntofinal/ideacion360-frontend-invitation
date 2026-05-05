import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function Carousel() {
  const { config } = useCardConfig();
  const { carousel } = config;
  const images = (carousel.images as string[]) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, (carousel.autoPlayInterval as number) || 6000);
    return () => clearInterval(timer);
  }, [images.length, carousel.autoPlayInterval]);

  const goTo = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((p) => (p + 1) % images.length);
  };

  if (images.length === 0) return null;


  return (
    <section className="w-full py-20 md:py-32 px-4 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="text-base sm:text-2xl italic leading-relaxed uppercase mb-2" style={{ color: carousel.titleColor, fontFamily: carousel.titleFont }}>
          ♥ &nbsp; {carousel.carouselMsg} &nbsp; ♥
        </p>
        <br />
        <br />
      </motion.div>

      {/* Slider */}
      <div className="relative w-full max-w-6xl mx-auto group">
        {/* Main image container */}
        <div className="relative overflow-hidden aspect-[4/5] sm:aspect-video md:aspect-[16/9] rounded-none md:rounded-2xl">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1, x: direction > 0 ? 30 : -30, y: 10 }}
              animate={{ opacity: 1, scale: 1.05, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: direction > 0 ? -30 : 30, y: -10 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 10, ease: "linear" },
                x: { duration: 1.5, ease: [0.32, 0.72, 0, 1] },
                y: { duration: 1.5, ease: [0.32, 0.72, 0, 1] }
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Main Focused Image */}
              <img
                src={images[currentIndex]}
                className="w-full h-full object-contain cursor-zoom-in drop-shadow-2xl"
                onClick={() => setSelectedImage(images[currentIndex])}
                referrerPolicy="no-referrer"
                alt={`Imagen ${currentIndex + 1}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/40 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/40 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: carousel.titleColor,
                  opacity: i === currentIndex ? 1 : 0.35,
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
              style={{ color: carousel.buttonCloseColor }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              src={selectedImage}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
