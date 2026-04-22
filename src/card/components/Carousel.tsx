import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function Carousel() {
  const { config } = useCardConfig();
  const { carousel } = config;
  const images = (carousel.images as string[]) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % images.length); }, (carousel.autoPlayInterval as number) || 6000);
    return () => clearInterval(timer);
  }, [images.length, carousel.autoPlayInterval]);

  if (images.length === 0) return null;

  return (
    <section className="w-full my-0 md:my-12 md:rounded-3xl backdrop-blur-lg relative overflow-hidden py-6 px-0 md:px-6 flex flex-col justify-center items-center">
      <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-10 tracking-widest uppercase"
        style={{ color: carousel.titleColor as string, fontFamily: carousel.titleFont as string }}>
        {carousel.carouselMsg as string}
      </h2>
      <div className="w-full max-w-4xl mx-auto relative group">
        <div className="aspect-video md:aspect-[21/9] overflow-hidden rounded-none md:rounded-2xl relative">
          <AnimatePresence mode="wait">
            <motion.img key={currentIndex} src={images[currentIndex]}
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-[center_25%] cursor-zoom-in"
              onClick={() => setSelectedImage(images[currentIndex])}
              referrerPolicy="no-referrer" />
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6" style={{ color: carousel.buttonCloseColor as string }}><X className="w-8 h-8" /></button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage}
              className="max-w-full max-h-full object-contain rounded-lg" referrerPolicy="no-referrer" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
