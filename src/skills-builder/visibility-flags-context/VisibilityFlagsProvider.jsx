import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import reducer from './data/reducer';
import { useVisibilityFlags } from './data/hooks';

export const VisibilityFlagsContext = createContext();

export const VisibilityFlagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, useVisibilityFlags());

  const value = useMemo(() => ({
    state,
    dispatch,
  }), [state]);

  return (
    <VisibilityFlagsContext.Provider value={value}>
      {children}
    </VisibilityFlagsContext.Provider>
  );
};

VisibilityFlagsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
