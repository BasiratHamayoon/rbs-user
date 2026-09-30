"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

function OwnerSection() {
  const t = useTranslations('whyUs');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className='text-black grid lg:grid-cols-2 grid-cols-1 lg:px-40 px-8 py-20 gap-12 lg:gap-20 justify-center items-center bg-slate-50 min-h-[80vh] w-full'
    >
      <motion.div 
        className='flex flex-col items-center lg:items-start h-full justify-center w-full'
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className='w-full relative'>
          <div className="w-full max-w-lg mx-auto">
            <Image 
              src="/Whyus/owner.jpeg" 
              alt="Vision Roweiyat Founder"
              width={400}
              height={700}
              className='w-full h-[500px] object-cover rounded-2xl shadow-xl'
            />
          </div>
          
          <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-blue-700/20 rounded-xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-4 border-blue-700/30 rounded-lg pointer-events-none" />
        </div>
      </motion.div>

      <motion.div 
        className='flex flex-col h-full justify-center w-full'
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className='space-y-8'>
          <div className='space-y-6'>
            <h1 className='text-2xl font-bold text-blue-700 leading-tight tracking-wide uppercase'>
              {t('founderTitle')}
            </h1>
            
            <h2 className='text-3xl md:text-4xl lg:text-4xl font-bold text-slate-800 leading-tight'>
              {t('founderSubtitle')}
            </h2>
          </div>

          <div>
            <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-700 pl-4">
              {t('founderQuote')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default OwnerSection;