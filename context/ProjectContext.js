'use client';
import { createContext, useContext, useReducer, useCallback } from 'react';
import api from '../lib/api';

const ProjectContext = createContext();

const initialState = { projects: [], categories: [], loading: false, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING': return { ...state, loading: true, error: null };
    case 'SET_PROJECTS': return { ...state, loading: false, projects: action.payload };
    case 'SET_CATEGORIES': return { ...state, categories: action.payload };
    case 'ERROR': return { ...state, loading: false, error: action.payload };
    default: return state;
  }
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProjects = useCallback(async (category = 'all', locale = 'en') => {
    dispatch({ type: 'LOADING' });
    try {
      const endpoint = category === 'all' ? '/projects?limit=100' : `/projects?category=${category}&limit=100`;
      const data = await api.get(endpoint, locale);
      dispatch({ type: 'SET_PROJECTS', payload: data?.data?.projects || [] });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  }, []);

  const fetchCategories = useCallback(async (locale = 'en') => {
    try {
      const data = await api.get('/categories', locale);
      dispatch({ type: 'SET_CATEGORIES', payload: data?.data?.categories || [] });
    } catch (error) {
      console.error('Categories error:', error);
    }
  }, []);

  return (
    <ProjectContext.Provider value={{ ...state, fetchProjects, fetchCategories }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within ProjectProvider');
  return context;
};