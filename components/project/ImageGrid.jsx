"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight, ImageOff, Search } from 'lucide-react';

const ImageGrid = ({ items }) => {
  const t = useTranslations('projects');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewerLoading, setViewerLoading] = useState(false);

  const handleImageClick = (index) => {
    setViewerLoading(true);
    setSelectedIndex(index);
    const img = new Image();
    img.src = items[index]?.url || items[index];
    img.onload = () => setViewerLoading(false);
    img.onerror = () => setViewerLoading(false);
  };

  const handleNavigation = (newIndex) => {
    setViewerLoading(true);
    setSelectedIndex(newIndex);
    const img = new Image();
    img.src = items[newIndex]?.url || items[newIndex];
    img.onload = () => setViewerLoading(false);
    img.onerror = () => setViewerLoading(false);
  };

  const getImageUrl = (item) => (typeof item === 'string' ? item : item?.url);

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 sm:h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
        <div className="text-center text-slate-500 px-4">
          <ImageOff className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 opacity-50" />
          <p className="text-base sm:text-lg font-medium text-slate-600">{t('noImages')}</p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{t('noImagesSub')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => handleImageClick(index)}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img
                src={getImageUrl(item)}
                alt={`Project ${index + 1}`}
                className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 sm:pb-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-2xl border border-white/50">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
                  </div>
                </div>
              </div>

              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/20">
                #{index + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-70 border border-white/20"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation((selectedIndex - 1 + items.length) % items.length);
                  }}
                  className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-70 border border-white/20"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation((selectedIndex + 1) % items.length);
                  }}
                  className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-70 border border-white/20"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </>
            )}

            <div className="max-w-full max-h-full w-full relative flex items-center justify-center">
              {viewerLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="text-center">
                    <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-white text-xs sm:text-sm font-medium">{t('loadingImage')}</p>
                  </div>
                </div>
              )}

              <motion.img
                key={selectedIndex}
                src={getImageUrl(items[selectedIndex])}
                alt={`Project ${selectedIndex + 1}`}
                className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: viewerLoading ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/20">
                {selectedIndex + 1} {t('of')} {items.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGrid;