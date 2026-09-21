"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Loader from '../Loader';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const images = [
    "/Home/imgg1.jpeg",
    "/Home/imgg2.jpeg",
    "/Home/imgg3.jpeg"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 bg-gray-900">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" }
              }}
              style={{
                backgroundImage: `url(${images[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10"></div>
        </div>

        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div className="w-full" variants={itemVariants}>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
              >
                Building Your Dreams
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  With Precision
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto px-4"
            >
              We transform visions into reality with innovative construction solutions,
              unmatched expertise, and commitment to excellence in every project.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-md sm:max-w-lg mx-auto pt-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch">
                <Link
                  href="/Pages/projects"
                  onClick={handleButtonClick}
                  className="flex-1"
                >
                  <motion.button
                    className="w-full bg-[#001C73] text-white px-6 py-3 sm:py-4 rounded-full font-semibold shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base hover:bg-[#0026A3] transition-colors duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 28, 115, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore Our Projects</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </Link>

                <Link
                  href="/Pages/contactus"
                  onClick={handleButtonClick}
                  className="flex-1"
                >
                  <motion.button
                    className="w-full border-2 border-white text-white px-6 py-3 sm:py-4 rounded-full font-semibold backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base hover:bg-white hover:text-[#001C73] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Contact Us</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-2 justify-center pt-6"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentSlide === index
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;