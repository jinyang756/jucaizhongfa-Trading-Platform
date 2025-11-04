import React from 'react';
import '../styles/globalStyles.css';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default ThemeProvider;