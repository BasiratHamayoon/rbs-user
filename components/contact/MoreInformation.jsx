"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';

const MoreInformation = () => {
  const t = useTranslations('contact');
  const [expandedSections, setExpandedSections] = useState({});

  const sections = ['fca', 'scam', 'fraud'];

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8 my-12 lg:my-20 w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-3">
        <div className="p-2 bg-blue-700 text-white rounded-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {t('moreInfoLabel')}
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {sections.map((key) => {
          const isOpen = !!expandedSections[key];
          return (
            <div 
              key={key}
              className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white hover:border-blue-200 transition-all duration-300 w-full"
            >
              <button
                onClick={() => toggleSection(key)}
                className="w-full px-4 sm:px-6 py-4 text-left bg-slate-50 hover:bg-blue-50/30 transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors text-sm sm:text-base pr-4">
                  {t(`sections.${key}.title`)}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isOpen ? 'bg-blue-700 text-white rotate-180' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 py-4 bg-white border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                        {t(`sections.${key}.content`)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreInformation;