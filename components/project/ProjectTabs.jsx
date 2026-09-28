"use client"
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Frown } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { useProject } from '../../context/ProjectContext';

const ProjectTabs = ({ activeCategory, onCategoryChange }) => {
  const t = useTranslations('projects');
  const locale = useLocale();
  const { projects, categories, loading } = useProject();

  const tabCategories = [
    { id: 'all', name: t('all') },
    ...(categories || []).map(cat => ({
      id: cat._id,
      name: cat.name?.[locale] || cat.name?.en
    }))
  ];

  return (
    <section id="projects-section" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {tabCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              disabled={loading}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600 text-lg font-medium">{t('loading')}</p>
            </div>
          </div>
        )}

        {!loading && (projects || []).length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeCategory}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id || index}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {!loading && (projects || []).length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-md mx-auto">
              <Frown className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">{t('noFound')}</h3>
              <p className="text-slate-600">{t('noFoundSub')}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectTabs;