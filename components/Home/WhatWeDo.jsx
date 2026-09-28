"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Home, Layers, Grid3X3, Paintbrush, Fence, Shovel, CookingPot, Bath, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Loader from '../common/Loader'

function WhatWeDo() {
  const t = useTranslations('services');
  const locale = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMoreDetails = () => {
    setIsLoading(true);
    setTimeout(() => router.push(`/${locale}/about`), 800);
  };

  const servicesData = [
    { icon: <Home className="w-10 h-10" />, key: 'extensions' },
    { icon: <Layers className="w-10 h-10" />, key: 'plastering' },
    { icon: <Grid3X3 className="w-10 h-10" />, key: 'tiling' },
    { icon: <Paintbrush className="w-10 h-10" />, key: 'painting' },
    { icon: <Fence className="w-10 h-10" />, key: 'fencing' },
    { icon: <Shovel className="w-10 h-10" />, key: 'groundworks' },
    { icon: <CookingPot className="w-10 h-10" />, key: 'kitchens' },
    { icon: <Bath className="w-10 h-10" />, key: 'bathrooms' },
  ];

  return (
    <>
      {isLoading && <Loader />}

      <section ref={ref} className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Projects/bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/90" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/10 to-white/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-20">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {t('title')} <span className="text-blue-700">{t('titleAccent')}</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="relative h-80 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
                  <div
                    className="relative w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front of Card */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {t(`${service.key}.title`)}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t(`${service.key}.description`)}
                      </p>

                      <div className="absolute bottom-4 text-blue-700 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>{t('learnMore')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-center"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                        {service.icon}
                      </div>

                      <p className="text-white text-sm leading-relaxed mb-6 font-medium">
                        {t(`${service.key}.specialization`)}
                      </p>

                      <button
                        onClick={handleMoreDetails}
                        className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-200 shadow-lg"
                      >
                        <span>{t('moreDetails')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <p className="absolute bottom-4 text-white/70 text-sm font-medium">
                        {t(`${service.key}.title`)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-blue-700 rounded-2xl blur-md opacity-0 -z-10 group-hover:opacity-20 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatWeDo;