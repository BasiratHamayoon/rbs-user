"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Play, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Loader from '../common/Loader';

function OurPurpose() {
  const t = useTranslations('purpose');
  const locale = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  const handleVideoOpen = () => { setIsVideoOpen(true); setIsVideoLoading(true); };
  const handleVideoClose = () => {
    setIsVideoOpen(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };
  const handleReadMore = () => {
    setIsPageLoading(true);
    setTimeout(() => router.push(`/${locale}/why-us`), 800);
  };

  return (
    <>
      {isPageLoading && <Loader />}

      <section
        ref={ref}
        className="text-black overflow-hidden grid lg:grid-cols-2 grid-cols-1 lg:px-40 px-6 py-20 gap-12 lg:gap-20 justify-center items-start bg-slate-50 min-h-[80vh]"
      >
        <motion.div
          className="flex flex-col items-center lg:items-start h-full justify-between w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative cursor-pointer w-full max-w-lg"
            onClick={handleVideoOpen}
          >
            <Image
              src="/Home/thumbnail.jpg"
              alt="Video Thumbnail"
              width={600}
              height={400}
              className="w-full rounded-2xl shadow-xl"
              priority
            />
            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
              <div className="bg-white/95 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-700/30 hover:scale-110 transition-transform duration-300">
                <Play className="text-blue-700 text-xl sm:text-2xl ml-1" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full justify-center lg:justify-start pt-6">
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" />
            <p className="text-slate-700 text-lg font-semibold flex items-center gap-2">
              <Play className="text-blue-700 text-sm" />
              {t('watchVideo')}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col h-full justify-between space-y-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-blue-700 leading-tight tracking-wide uppercase">
                {t('whyUs')}
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-slate-800 leading-tight">
                {t('heading')}
              </h2>
            </div>

            <div
              onClick={handleReadMore}
              className="inline-flex items-center gap-3 text-slate-700 font-semibold text-lg cursor-pointer group relative pb-1"
            >
              <span>{t('readMore')}</span>
              <ChevronRight className="w-5 h-5" />
              <div className="h-0.5 bg-blue-700 absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-8 w-full">
            {[
              { number: '500+', label: t('projectsCompleted') },
              { number: '25+', label: t('yearsExperience') },
              { number: '98%', label: t('clientSatisfaction') }
            ].map((stat) => (
              <div key={stat.label}
                className="text-center p-4 rounded-xl bg-white shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl font-bold text-blue-700">{stat.number}</div>
                <div className="text-slate-600 text-sm font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <button
                onClick={handleVideoClose}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full">
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Loader2 className="text-white text-4xl animate-spin" />
                    <p className="absolute bottom-10 text-white text-lg font-semibold">{t('loadingVideo')}</p>
                  </div>
                )}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls autoPlay
                  onLoadStart={() => setIsVideoLoading(true)}
                  onCanPlay={() => setIsVideoLoading(false)}
                  onError={() => setIsVideoLoading(false)}
                >
                  <source src="/Home/video.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default OurPurpose;