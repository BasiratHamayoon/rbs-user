"use client";
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ContactHeading = () => {
  const t = useTranslations('contact');

  return (
    <div className="text-center w-full">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-6 lg:w-8 h-0.5 bg-blue-700 rounded-full"></div>
        <span className="text-sm font-semibold text-blue-700 tracking-widest uppercase">
          {t('label')}
        </span>
        <div className="w-6 lg:w-8 h-0.5 bg-blue-700 rounded-full"></div>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 px-2">
        {t('title1')} <span className="text-blue-700">{t('title2')}</span>
      </h1>
      
      <div className="w-16 lg:w-20 h-1 bg-blue-700 rounded-full mx-auto mb-6" />
      
      <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
        {t('subtitle')}
      </p>
    </div>
  );
};

export default ContactHeading;