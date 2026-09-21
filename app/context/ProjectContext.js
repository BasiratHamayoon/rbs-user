"use client"
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { api } from '@/Api/api';

const ProjectContext = createContext();

const initialState = {
  projects: {},
  loading: false,
  error: null,
  categories: []
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, projects: action.payload };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, categories: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const fetchProjects = useCallback(async (category = 'all') => {
    dispatch({ type: 'FETCH_START' });
    try {
      const endpoint = category === 'all' 
        ? '/projects'
        : `/projects?category=${encodeURIComponent(category)}`;
      
      const data = await api.get(endpoint);
      const rawProjects = data?.data?.projects || data?.projects || [];
      
      const allProjects = rawProjects.map(project => ({
        id: project._id || project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        shortDescription: project.shortDescription,
        image: project.images?.[0]?.url || '/Projects/default.jpg',
        images: project.images?.map(img => (typeof img === 'string' ? img : img.url)) || [],
        duration: project.duration,
        size: project.size,
        location: project.location,
        client: project.client,
        completionDate: project.completionDate ? new Date(project.completionDate).toLocaleDateString() : '',
        technologies: project.technologies || [],
        features: project.features || [],
        status: project.status,
        featured: project.featured
      }));

      const formattedProjects = {
        all: allProjects,
        ...allProjects.reduce((acc, project) => {
          const cat = project.category;
          if (cat) {
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(project);
          }
          return acc;
        }, {})
      };
      
      dispatch({ type: 'FETCH_SUCCESS', payload: formattedProjects });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await api.get('/projects/categories');
      const categories = data?.data?.categories || data?.categories || [];
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [fetchProjects, fetchCategories]);

  return (
    <ProjectContext.Provider value={{
      ...state,
      fetchProjects,
      refetchProjects: fetchProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};