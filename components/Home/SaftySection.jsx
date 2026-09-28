"use client";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

function SafetySection() {
  const t = useTranslations('safety');

  const highlights = [
    {
      icon: ShieldCheck,
      title: t('f1Title'),
      desc: t('f1Desc')
    },
    {
      icon: Award,
      title: t('f2Title'),
      desc: t('f2Desc')
    },
    {
      icon: CheckCircle2,
      title: t('f3Title'),
      desc: t('f3Desc')
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-blue-700 rounded-full" />
            <span className="text-xs sm:text-sm font-bold text-blue-700 tracking-widest uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
              {t('badge')}
            </span>
            <div className="w-8 h-0.5 bg-blue-700 rounded-full" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 mb-4">
            {t('title')}
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 mx-auto mb-6 rounded-full" />

          <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto font-light">
            {t('subtitle')}{' '}
            <span className="font-bold text-blue-700">{t('subtitleAccent')}</span>{' '}
            {t('subtitleEnd')}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image with Frame and Badge */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center items-center h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full bg-white rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300">
              <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden">
                <Image
                  src="/Home/safty.png"
                  alt="Site Safety"
                  fill
                  className="object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Animated Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                {t('badge')}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Extended Text & Structured Safety Highlights */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Introductory Text */}
            <div className="space-y-4">
              <span className="font-bold text-blue-700 text-2xl block pl-4 border-l-4 border-blue-700">
                {t('brandName')}
              </span>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify">
                {t('description')}
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify">
                {t('description2')}
              </p>
            </div>

            {/* Structured Feature Cards to Balance Image Height */}
            <div className="grid gap-4 pt-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-300 flex items-start gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base sm:text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SafetySection;