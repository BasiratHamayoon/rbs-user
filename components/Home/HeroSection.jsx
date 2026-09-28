"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Loader from '../common/Loader';

const HeroSection = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const images = ["/Home/imgg1.jpeg", "/Home/imgg2.jpeg", "/Home/imgg3.jpeg"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url(${images[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              {t('title1')}<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t('title2')}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto px-4">
              {t('subtitle')}
            </p>

            <div className="w-full max-w-md sm:max-w-lg mx-auto pt-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch">
                <Link href={`/${locale}/projects`} onClick={handleButtonClick} className="flex-1">
                  <button className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-full font-semibold shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300">
                    <span>{t('exploreProjects')}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>

                <Link href={`/${locale}/contact`} onClick={handleButtonClick} className="flex-1">
                  <button className="w-full border-2 border-white text-white px-6 py-3 sm:py-4 rounded-full font-semibold backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base hover:bg-white hover:text-blue-700 transition-colors duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{t('contactUs')}</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-6">
              {images.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;