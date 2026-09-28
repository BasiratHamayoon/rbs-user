"use client"
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, Zap, Clock } from 'lucide-react';

const WhyUsHero = () => {
  const t = useTranslations('whyUs');

  return (
    <section className="relative pt-20 md:pt-24 h-96 sm:h-[500px] lg:h-[600px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Whyus/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-white/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-blue-500/5 to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div 
          className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-4 mb-8 mt-8 md:mt-12">
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold text-blue-700 tracking-widest uppercase bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              {t('heroLabel')}
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-blue-700 to-blue-500 rounded-full" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
              {t('heroTitle1')}
            </span>
            {' '}
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              {t('heroTitle2')}
            </span>
          </h1>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full mx-auto mb-6 md:mb-8 shadow-md" />
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-semibold mb-6 md:mb-8">
            {t('heroSubtitle')}
          </p>

          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { text: t('experienceBadge'), icon: <Star className="w-4 h-4 text-blue-600" /> },
              { text: t('projectsBadge'), icon: <Zap className="w-4 h-4 text-blue-600" /> },
              { text: t('satisfactionBadge'), icon: <Clock className="w-4 h-4 text-blue-600" /> }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-white/90 rounded-2xl px-5 py-3 shadow-lg border border-slate-200/50 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-slate-800 font-semibold text-sm">{item.text}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
};

export default WhyUsHero;