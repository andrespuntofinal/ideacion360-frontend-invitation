import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { APP_CONFIG } from "../constants";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = APP_CONFIG.carousel.images;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, APP_CONFIG.carousel.autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="w-full my-0 md:my-12 md:rounded-3xl  backdrop-blur-lg relative overflow-hidden py-6 px-0 md:px-6 flex flex-col justify-center items-center">
      <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-10  tracking-widest uppercase"
      style={{ color: APP_CONFIG.carousel.titleColor, fontFamily: APP_CONFIG.carousel.titleFont}}>
        
        
        
        {APP_CONFIG.carousel.carouselMsg}
      </h2>
      <div className="w-full max-w-4xl mx-auto relative group">
        <div className={`aspect-video md:aspect-[21/9] overflow-hidden rounded-none md:rounded-2xl relative `}
        
          >
          <AnimatePresence mode="wait">
  <motion.img
    key={currentIndex}
    src={images[currentIndex]}
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{
      duration: 1.2,
      ease: "easeInOut"
    }}
    className="w-full h-full object-cover object-[center_25%] cursor-zoom-in"
    onClick={() => setSelectedImage(images[currentIndex])}
    referrerPolicy="no-referrer"
  />
</AnimatePresence>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]  flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6"
            style={{ color: APP_CONFIG.carousel.buttonCloseColor}}>
              
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
