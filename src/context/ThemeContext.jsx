import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => localStorage.getItem('reevue_theme') === 'dark');

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('reevue_theme', next ? 'dark' : 'light');
            document.body.classList.toggle('dark', next);
            return next;
        });
    };

    // Apply on mount
    if (isDark) 
        document.body.classList.add('dark');

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;