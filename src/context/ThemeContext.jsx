import { createContext, useContext, useState , useEffect} from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

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

    useEffect(() => {
        if (isDark) document.body.classList.add('dark');
    }, []);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

