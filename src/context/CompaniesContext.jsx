import React, { createContext, useReducer } from 'react';

const CompaniesContext = createContext();

const initialCompaniesState = {
  searchFilters: {
    industry: 'All',
    city: 'All',
    companySize: 'All',
    starRating: null,
    difficulty: 'All',
  },
};

const companiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          ...action.payload,
        },
      };
    case 'RESET_FILTERS':
      return initialCompaniesState;
    default:
      return state;
  }
};

export const CompaniesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companiesReducer, initialCompaniesState);

  const setFilters = (payload) => dispatch({ type: 'SET_FILTERS', payload });
  const resetFilters = () => dispatch({ type: 'RESET_FILTERS' });

  return (
    <CompaniesContext.Provider value={{ companies: state, setFilters, resetFilters }}>
      {children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesContext;
