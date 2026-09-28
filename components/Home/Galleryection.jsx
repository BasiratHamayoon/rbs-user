"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Loader from '../common/Loader';
import { useProject } from '../../context/ProjectContext';

function GallerySection() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const router = useRouter();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { projects, loading, fetchProjects } = useProject();

  useEffect(() => {
    fetchProjects('all', locale);
  }, [fetchProjects, locale]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const featured = projects.filter(p => p.featured).slice(0, 4);
      const display = featured.length >= 4 ? featured : projects.slice(0, 4);
      setFeaturedProjects(display);
    }
  }, [projects]);

  const handleViewMore = () => {
    setSelectedProject(null);
    setIsPageLoading(true);
    setTimeout(() => router.push(`/${locale}/projects`), 800);
  };

  const handleProjectClick = (project) => {
    setIsPageLoading(true);
    setTimeout(() => router.push(`/${locale}/projects/${project._id}`), 500);
  };

  return (
    <>
      {isPageLoading && <Loader />}

      <section id="gallery" ref={ref} className="py-20 bg-gradient-to-b from-white to-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {t('featured')} <span className="text-blue-700">{t('projects')}</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('subtitle')}
            </motion.p>
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600 font-medium">{t('loading')}</p>
              </div>
            </div>
          )}

          {!loading && featuredProjects.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id || index}
                  className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                    {project.images?.[0]?.url ? (
                      <img
                        src={project.images[0].url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
                    )}

                    <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg z-20">
                      {project.category?.name?.[locale] || project.category?.name?.en || ''}
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-4 sm:p-6 z-10">
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-full transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-bold text-lg sm:text-xl line-clamp-1">
                            {project.title?.[locale] || project.title?.en}
                          </h3>
                          <div className="bg-white rounded-full p-2 shadow-lg">
                            <ArrowRight className="w-4 h-4 text-blue-700" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <span>{project.duration?.[locale] || project.duration?.en}</span>
                          <span>{project.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                        {project.title?.[locale] || project.title?.en}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {project.description?.[locale] || project.description?.en}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{project.duration?.[locale] || project.duration?.en}</span>
                      <span>{project.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && featuredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t('noProjects')}</h3>
                <p className="text-slate-600">{t('noProjectsSub')}</p>
              </div>
            </div>
          )}

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-8 md:p-12 shadow-xl">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {t('discoverMore')}
              </h3>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                {t('discoverSubtitle')}
              </p>
              <button
                onClick={handleViewMore}
                className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 shadow-lg cursor-pointer"
              >
                {t('viewMore')} <ArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default GallerySection;