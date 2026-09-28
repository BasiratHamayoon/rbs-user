"use client"
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Lightbulb } from 'lucide-react';

const MissionSection = () => {
  const t = useTranslations('whyUs');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const values = [
    { key: 'qualityFirst', icon: Award },
    { key: 'innovationDriven', icon: Lightbulb }
  ];

  return (
    <section ref={ref} className="relative py-20 bg-slate-900 text-white overflow-hidden w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Whyus/mbg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-white/70" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              {t('missionTitle1')} <span className="text-blue-700">{t('missionTitle2')}</span>
            </h2>
            <div className="w-20 h-1 bg-blue-700 rounded-full mx-auto" />
          </motion.div>

          <motion.p 
            className="text-xl md:text-2xl leading-relaxed text-slate-700 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('missionQuote')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            {values.map((val, index) => (
              <motion.div 
                key={val.key}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-blue-700 mb-4 flex justify-center">
                  <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">
                  {t(`${val.key}`)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed text-center">
                  {t(`${val.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;