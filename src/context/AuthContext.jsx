import React, { createContext, useReducer } from 'react';

const AuthContext = createContext();

const loadAuthState = () => {
  try {
    const storedAuth = localStorage.getItem('reevue_auth_v1');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      return {
        user: parsed.user || null,
        token: parsed.token || null,
        isLoggedIn: !!parsed.user,
      };
    }
  } catch (err) {
    console.error('Failed to parse auth state', err);
  }
  return { user: null, token: null, isLoggedIn: false };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const newState = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
      localStorage.setItem('reevue_auth_v1', JSON.stringify({
        user: newState.user,
        token: newState.token,
      }));
      return newState;
    }
    case 'LOGOUT': {
      localStorage.removeItem('reevue_auth_v1');
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    }
    case 'UPDATE_PROFILE': {
      if (!state.user) return state;
      const newState = {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
      localStorage.setItem('reevue_auth_v1', JSON.stringify({
        user: newState.user,
        token: newState.token,
      }));
      return newState;
    }
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, undefined, loadAuthState);

  const login = (payload) => dispatch({ type: 'LOGIN', payload });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const updateProfile = (payload) => dispatch({ type: 'UPDATE_PROFILE', payload });

  return (
    <AuthContext.Provider value={{ auth: state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
