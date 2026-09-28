"use client"
import { motion } from 'framer-motion';
import { Star, Zap, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations('projects');

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 min-h-[580px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] flex items-center justify-center w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Projects/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/80 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-blue-500/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-5xl mx-auto flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold text-blue-700 tracking-widest uppercase bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              {t('heroLabel')}
            </span>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-blue-700 to-blue-500 rounded-full" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight text-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span>{t('heroTitle1')}</span>{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              {t('heroTitle2')}
            </span>
          </motion.h1>

          <motion.div
            className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full mb-6 md:mb-8 shadow-lg"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-700 max-w-3xl leading-relaxed font-semibold mb-8 md:mb-10 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('heroSubtitle')} <span className="text-blue-700 font-bold">{t('heroSubtitleAccent')}</span> {t('heroSubtitleEnd')}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { text: t('premiumQuality'), icon: <Star className="w-3.5 h-3.5" /> },
              { text: t('innovativeDesign'), icon: <Zap className="w-3.5 h-3.5" /> },
              { text: t('timelyDelivery'), icon: <Clock className="w-3.5 h-3.5" /> }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 shadow-md border border-slate-200 min-w-[180px] justify-center sm:justify-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-slate-800 font-bold text-xs sm:text-sm whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;