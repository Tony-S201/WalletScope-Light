import { useTheme } from '../context/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <DarkMode className="w-5 h-5 text-yellow-500" />
      ) : (
        <LightMode className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};