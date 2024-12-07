import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Hero() {
  const controls = useAnimation();
  const heroRef = useRef(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1 }
    });
  }, [controls]);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
        <img
          src="https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg"
          alt="Professional camera lens"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        {/* Decorative line */}
        <motion.div
          className="w-24 h-px bg-amber-400/50 mb-8"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-serif text-amber-400 mb-6 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          SNAPSTORE
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-12 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          PHOTO STUDIO
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-amber-400 text-black text-sm tracking-wider hover:bg-amber-500 transition-colors duration-300 rounded"
          >
            EXPLORE GALLERY
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-amber-400 text-amber-400 text-sm tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-300 rounded"
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Static corner decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-amber-400/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-amber-400/30" />
    </div>
  );
}
