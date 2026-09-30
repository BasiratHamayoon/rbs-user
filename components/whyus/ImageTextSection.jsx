"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield } from 'lucide-react';
import Loader from '../common/Loader';

const ImageTextSection = () => {
  const t = useTranslations('whyUs');
  const locale = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 1500);
  };

  const statItems = [
    { key: 'excellence', val: '25+' },
    { key: 'success', val: '500+' },
    { key: 'satisfaction', val: '99%' }
  ];

  return (
    <>
      {isLoading && <Loader />}
      
      <section ref={ref} className="py-20 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
            <motion.div 
              className="flex-1 flex items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    {t('chooseTitle')}
                  </h2>
                  <div className="w-20 h-1 bg-blue-700 rounded-full mb-6" />
                </div>

                <div className="space-y-6">
                  {statItems.map((item) => (
                    <div key={item.key} className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold text-lg shadow-md">
                        {item.val}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{t(`${item.key}Title`)}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{t(`${item.key}Desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link href={`/${locale}/about`} onClick={handleButtonClick}>
                    <button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                      {t('learnProcess')}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-lg">
                <img
                  src="/Whyus/whyChoose.jpeg"
                  alt="Vision Roweiyat Construction Site"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
                />
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-1 flex items-center justify-center gap-1">
                      <Shield className="w-6 h-6 text-blue-700" /> A+
                    </div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t('safetyRating')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageTextSection;