"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Clock, Ruler, MapPin, User, Calendar, Tag, Star, Check, Mail } from 'lucide-react';
import api from '../../../../lib/api';
import ImageGrid from 'components/project/ImageGrid';

export default function ProjectDetailPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get(`/projects/${id}`, locale);
        setProject(data?.data?.project);
      } catch (error) {
        console.error('Failed to load:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">{t('noFound')}</p>
      </div>
    );
  }

  const title = project.title?.[locale] || project.title?.en || '';
  const description = project.description?.[locale] || project.description?.en || '';
  const shortDesc = project.shortDescription?.[locale] || project.shortDescription?.en || '';
  const duration = project.duration?.[locale] || project.duration?.en || '';
  const location = project.location?.[locale] || project.location?.en || '';
  const features = project.features?.[locale] || project.features?.en || [];
  const categoryName = project.category?.name?.[locale] || project.category?.name?.en || '';

  const tabs = ['overview', 'gallery', 'details'];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-br from-blue-800 to-blue-600 py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 2%, transparent 2%)',
          backgroundSize: '30px 30px'
        }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t('backToProjects')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {categoryName && (
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
                  <Tag className="w-3.5 h-3.5" /> {categoryName}
                </span>
              )}
              {project.featured && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-white" /> Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
            {shortDesc && <p className="text-blue-100 text-lg max-w-3xl">{shortDesc}</p>}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="border-b border-slate-100">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 sm:flex-none px-6 py-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-blue-700 text-blue-700'
                          : 'border-transparent text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {t(tab)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 lg:p-8">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 mb-3">{t('projectOverview')}</h2>
                      <p className="text-slate-600 leading-relaxed">{description}</p>
                    </div>

                    {features.length > 0 && (
                      <div>
                        <h3 className="font-bold text-slate-800 mb-3">{t('features')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {features.map((f, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                              <Check className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700 text-sm">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageGrid items={project.images || []} />
                  </motion.div>
                )}

                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {(project.technologies || []).length > 0 && (
                      <div>
                        <h3 className="font-bold text-slate-800 mb-3">{t('technologies')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-slate-800 mb-3">{t('projectInfo')}</h3>
                      <div className="space-y-3 text-slate-600 text-sm">
                        <p><strong className="text-slate-800">{t('client')}:</strong> {project.client}</p>
                        <p>
                          <strong className="text-slate-800">{t('completionDate')}:</strong>{' '}
                          {project.completionDate ? new Date(project.completionDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                        </p>
                        <p><strong className="text-slate-800">{t('location')}:</strong> {location}</p>
                        <p><strong className="text-slate-800">{t('status')}:</strong> <span className="capitalize">{project.status}</span></p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { icon: Clock, label: t('duration'), value: duration },
                { icon: Ruler, label: t('size'), value: project.size },
                { icon: MapPin, label: t('location'), value: location },
                { icon: User, label: t('client'), value: project.client },
                {
                  icon: Calendar,
                  label: t('completionDate'),
                  value: project.completionDate ? new Date(project.completionDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US') : ''
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">{item.label}</p>
                    <p className="text-slate-800 font-medium text-sm">{item.value || '-'}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-bold text-lg mb-2">{t('contactAbout')}</h3>
              <p className="text-blue-100 text-sm mb-4">Interested in a similar project?</p>
              <Link href={`/${locale}/contact`}>
                <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> {t('contactAbout')}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}