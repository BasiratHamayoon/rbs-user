"use client"
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useProject } from '../../../context/ProjectContext';
import HeroSection from 'components/project/HeroSection';
import QualitySection from 'components/project/QualitySection';
import ProjectTabs from 'components/project/ProjectTabs';

export default function ProjectsPage() {
  const locale = useLocale();
  const { fetchProjects, fetchCategories } = useProject();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchProjects('all', locale);
    fetchCategories(locale);
  }, [fetchProjects, fetchCategories, locale]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    fetchProjects(categoryId, locale);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <QualitySection />
      <ProjectTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
    </div>
  );
}