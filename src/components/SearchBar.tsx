import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}; 