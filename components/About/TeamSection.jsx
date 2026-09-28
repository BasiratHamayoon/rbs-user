"use client";
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, User, Award, Flame, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

// Reliable inline LinkedIn SVG icon
const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.66 1.66 0 0 0 7.83 6.2Z" />
  </svg>
);

const TeamSection = () => {
  const t = useTranslations('about');
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef(null);

  const teamMembers = [
    { id: 'sarah', image: '/About/01.jpg', icon: Flame, badges: ["Leadership", "Strategy"] },
    { id: 'michael', image: '/About/02.jpg', icon: Award, badges: ["Management", "Operations"] },
    { id: 'emily', image: '/About/03.jpg', icon: Lightbulb, badges: ["Architecture", "Design"] },
    { id: 'david', image: '/About/04.jpg', icon: User, badges: ["Commercial", "Quality"] },
    { id: 'lisa', image: '/About/05.jpg', icon: Award, badges: ["Creative", "Modern"] },
    { id: 'robert', image: '/About/01.jpg', icon: User, badges: ["Operations", "Logistics"] }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
      const nextIndex = direction === 'left' 
        ? Math.max(0, activeCard - 1) 
        : Math.min(teamMembers.length - 1, activeCard + 1);
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
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-blue-700 rounded-full" />
            <span className="text-sm font-bold text-blue-700 tracking-widest uppercase">
              {t('teamHeader')}
            </span>
            <div className="w-12 h-0.5 bg-blue-700 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            {t('teamTitle')}
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('teamSubtitle')}
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
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="flex-none w-80 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className={`bg-white rounded-2xl border-2 transition-all duration-300 flex flex-col h-[460px] overflow-hidden ${
                  index === activeCard ? 'border-blue-500 shadow-xl' : 'border-slate-100 shadow-md'
                }`}>
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md">
                      {t(`team.${member.id}.position`)}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {t(`team.${member.id}.name`)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.badges.map((badge, bIdx) => (
                        <span key={bIdx} className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                      {t(`team.${member.id}.description`)}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-shrink-0">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">
                        {t('roleRecipient')}
                      </span>
                      <div className="flex gap-2">
                        <a href="#" className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-colors">
                          <LinkedInIcon className="w-3.5 h-3.5" />
                        </a>
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                          <member.icon className="w-3.5 h-3.5 text-blue-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {teamMembers.map((_, index) => (
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

export default TeamSection;