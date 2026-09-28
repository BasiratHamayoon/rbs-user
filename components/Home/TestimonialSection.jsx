'use client';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

const reviews = [
  { review: "Working with this construction team was an absolute pleasure. They delivered our project ahead of schedule.", stars: 5, profileTitle: "Sarah Johnson", position: "Project Manager, TechCorp" },
  { review: "The attention to detail and professionalism is remarkable. Our commercial building was completed with precision.", stars: 5, profileTitle: "Michael Chen", position: "CEO, BuildRight Inc" },
  { review: "From design to completion, the entire process was seamless. Outstanding work!", stars: 4, profileTitle: "Emily Rodriguez", position: "Architect, Design Studio" },
  { review: "They transformed our vision into reality with exceptional craftsmanship. Very impressed!", stars: 5, profileTitle: "David Thompson", position: "Homeowner" },
  { review: "Professional, reliable, and skilled. Delivered exactly what they promised.", stars: 5, profileTitle: "Lisa Wang", position: "Property Developer" },
  { review: "Outstanding service and quality workmanship. Responsive to our needs throughout.", stars: 4, profileTitle: "Robert Martinez", position: "Business Owner" }
];

function TestimonialSection() {
  const t = useTranslations('testimonials');
  const scrollContainerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320;
      container.scrollTo({ left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount), behavior: 'smooth' });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth - 10));
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollContainerRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} w-4 h-4`} />
    ));
  };

  return (
    <section ref={ref} className="flex flex-col justify-center items-center bg-white lg:px-8 px-4 py-16 md:py-20 text-black overflow-hidden">
      <motion.div
        className="text-center max-w-3xl mb-12 md:mb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="text-blue-700 text-lg md:text-[22px] font-semibold mb-3 md:mb-4 relative inline-block">
          <span className="absolute -left-4 md:-left-6 top-1/2 transform -translate-y-1/2">❝</span>
          {t('topLabel')}
          <span className="absolute -right-4 md:-right-6 top-1/2 transform -translate-y-1/2">❞</span>
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
          {t('title')}
        </h1>

        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
          {t('line1')}
          <span className="block">{t('line2')}</span>
          <span>{t('line3')}</span>
        </p>
      </motion.div>

      <motion.div
        className="relative w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 bg-white hover:bg-blue-700 text-blue-700 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border border-slate-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 bg-white hover:bg-blue-700 text-blue-700 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border border-slate-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto gap-4 md:gap-6 lg:gap-8 py-4 md:py-6 px-2 md:px-4 scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-80 bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 border border-slate-100 mx-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex mb-4 md:mb-6 gap-1">
                  {renderStars(review.stars)}
                </div>

                <p className="text-slate-700 mb-4 md:mb-6 leading-relaxed flex-grow text-sm md:text-lg italic">
                  "{review.review}"
                </p>

                <div className="flex items-center space-x-3 md:space-x-4 pt-4 md:pt-6 border-t border-slate-200">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg overflow-hidden">
                    <span className="text-white font-semibold">{review.profileTitle.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base md:text-lg truncate">{review.profileTitle}</h4>
                    <p className="text-xs md:text-sm text-slate-600 truncate">{review.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

export default TestimonialSection;