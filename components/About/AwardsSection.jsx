"use client";
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Trophy, Award, Landmark, Star, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

const AwardsSection = () => {
  const t = useTranslations('about');
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef(null);

  const awards = [
    { id: 'construction', image: '/About/1.jpg', icon: Trophy },
    { id: 'safety', image: '/About/2.jpg', icon: Award },
    { id: 'sustainable', image: '/About/3.jpg', icon: Landmark },
    { id: 'client', image: '/About/4.jpg', icon: Star },
    { id: 'architecture', image: '/About/5.jpg', icon: Trophy },
    { id: 'community', image: '/About/1.jpg', icon: Medal }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
      const nextIndex = direction === 'left' 
        ? Math.max(0, activeCard - 1) 
        : Math.min(awards.length - 1, activeCard + 1);
      setActiveCard(nextIndex);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden w-full">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-blue-700 rounded-full" />
            <span className="text-sm font-semibold text-blue-700 tracking-widest uppercase">
              {t('awardHeader')}
            </span>
            <div className="w-8 h-0.5 bg-blue-700 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            {t('awardTitle')}
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('awardSubtitle')}
          </p>
        </motion.div>

        <div className="relative w-full">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto py-6 px-4 scroll-smooth scrollbar-hide gap-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                className="flex-none w-80 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className={`bg-white rounded-2xl border-2 transition-all duration-300 flex flex-col h-[460px] overflow-hidden ${
                  index === activeCard ? 'border-blue-500 shadow-xl' : 'border-slate-100 shadow-md'
                }`}>
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={award.image}
                      alt=""
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md">
                      <award.icon className="w-5 h-5 text-blue-700" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-2">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg bg-blue-50 text-blue-700 uppercase">
                        {t(`achievements.${award.id}.category`)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
                      {t(`achievements.${award.id}.title`)}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-xs mb-4 flex-grow">
                      {t(`achievements.${award.id}.description`)}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-shrink-0">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">
                        {t('awardRecipient')}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center shadow-md">
                        <Star className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCard(index);
                  if (scrollRef.current) scrollRef.current.scrollLeft = index * 350;
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeCard ? 'bg-blue-700 w-8' : 'bg-slate-300 w-2.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;