"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Eye, Clock, Ruler, Star } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const t = useTranslations('projects');
  const locale = useLocale();
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const image = project.images?.[0]?.url || '/Projects/house1.jpg';
  const title = project.title?.[locale] || project.title?.en || '';
  const description = project.description?.[locale] || project.description?.en || '';
  const duration = project.duration?.[locale] || project.duration?.en || '';
  const categoryName = project.category?.name?.[locale] || project.category?.name?.en || '';

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [image]);

  const handleClick = () => {
    router.push(`/${locale}/projects/${project._id}`);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden cursor-pointer w-full hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-400"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-3 border-blue-700 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <img
          src={imageError ? '/Projects/house1.jpg' : image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />

        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg z-20">
          {categoryName}
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-20">
            <Star className="w-3 h-3 fill-white" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-end p-4 sm:p-6 z-10">
          <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-full transition-all duration-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-lg sm:text-xl line-clamp-1">{title}</h3>
              <div className="bg-white/90 rounded-full p-2 shadow-lg">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
              </div>
            </div>
            <p className="text-gray-200 text-sm line-clamp-2 mb-3">{description}</p>
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
              <span className="flex items-center gap-1"><Ruler className="w-3 h-3" />{project.size}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
          <span className="text-sm text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-full">
            {categoryName}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{duration}</span></div>
          <div className="flex items-center gap-1"><Ruler className="w-4 h-4" /><span>{project.size}</span></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;