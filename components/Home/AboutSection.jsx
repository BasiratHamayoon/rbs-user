"use client"
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Loader from '../common/Loader';

function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMoreDetails = () => {
    setIsLoading(true);
    setTimeout(() => router.push(`/${locale}/about`), 800);
  };

  return (
    <>
      {isLoading && <Loader />}

      <motion.section
        ref={ref}
        className="grid lg:grid-cols-2 grid-cols-1 py-20 justify-center items-center text-blue-700 lg:px-40 px-4 sm:px-8 gap-8 sm:gap-12 lg:gap-20 bg-white"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="space-y-6 px-2 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight py-2 text-slate-800">
            {t('constructions')}
            <span className="block text-blue-700 pl-2">{t('renovations')}</span>
          </h1>

          <p className="text-slate-600 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed">
            {t('description')}
          </p>

          <button
            onClick={handleMoreDetails}
            className="border-2 border-blue-700 text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-3 text-sm sm:text-base"
          >
            <span>{t('moreDetails')}</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center relative w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg lg:max-w-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="/Home/image.jpg"
              alt="Construction Project"
              className="w-full h-[350px] sm:h-[400px] lg:h-[450px] object-cover rounded-2xl"
              width={600}
              height={450}
              priority
            />
          </div>

          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-[14px] sm:text-[16px] lg:text-[18px] px-4 sm:px-6 lg:px-8 py-1 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl font-bold shadow-xl z-10">
            {t('years')}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}

export default AboutSection;