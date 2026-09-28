"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check } from 'lucide-react';
import Loader from '../common/Loader';

const PartnershipSection = () => {
  const t = useTranslations('whyUs');
  const locale = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 1500);
  };

  const bullets = ['communityDev', 'sustainableConst', 'techPartners'];

  return (
    <>
      {isLoading && <Loader />}
      
      <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-lg">
                <img
                  src="/Whyus/t.jpg"
                  alt="Strategic Partnerships"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute -top-4 -left-4 bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm">
                  {t('trustedBadge')}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    {t('partnershipsTitle')}
                  </h2>
                  <div className="w-20 h-1 bg-blue-700 rounded-full mb-6" />
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('partnershipsSubtitle')}
                </p>

                <div className="space-y-4">
                  {bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-100">
                        <Check className="w-4 h-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{t(bullet)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link href={`/${locale}/projects`} onClick={handleButtonClick} className="flex-1">
                    <button className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                      <span>{t('viewOurProjects')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  
                  <Link href={`/${locale}/contact`} onClick={handleButtonClick} className="flex-1">
                    <button className="w-full border-2 border-blue-700 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 hover:text-white transition-all">
                      {t('startPartnership')}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnershipSection;