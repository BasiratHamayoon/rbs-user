"use client";
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

function ValuesSection() {
  const t = useTranslations('about');

  return (
    <section className="relative py-20 px-6 bg-white overflow-hidden w-full">
      <div className="absolute top-10 left-10 w-60 h-60 bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8 justify-center items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-blue-700 leading-tight">
          {t('valuesHeading')}
        </h2>

        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
          {t('valuesText')}
        </p>

        <div className="flex gap-4 mt-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2.5 h-2.5 bg-blue-600 rounded-full opacity-60 animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default ValuesSection;