import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { User } from './types';
import { SearchBar } from './components/SearchBar';
import { Leaderboard } from './components/Leaderboard';
import { AdminPage } from './pages/AdminPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Footer from './components/Footer';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600" />
      )}
    </motion.button>
  );
};

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-cyan-500/30 to-teal-500/30 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [15, 0, 15],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-bl from-emerald-500/20 via-yellow-500/20 to-orange-500/20 dark:from-emerald-900/20 dark:via-yellow-900/20 dark:to-orange-900/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </>
  );
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Load initial data
  useEffect(() => {
    const loadData = () => {
      const storedData = localStorage.getItem('leaderboardData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setUsers(parsedData.users || []);
          setLastUpdated(parsedData.lastUpdated || '');
          console.log('Loaded data from localStorage:', parsedData.users.length, 'users');
        } catch (error) {
          console.error('Error parsing leaderboard data:', error);
        }
      }
    };

    // Load data on mount
    loadData();

    // Create a custom event listener for data updates
    const handleDataUpdate = () => {
      loadData();
    };

    window.addEventListener('leaderboardUpdate', handleDataUpdate);
    return () => window.removeEventListener('leaderboardUpdate', handleDataUpdate);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <InteractiveBackground />
          <div className="relative z-10">
            <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.1}}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link to="/" className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                        Arcade Facilitator 2025
                      </Link>
                    </motion.div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {lastUpdated && (
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Last Updated: {new Date(lastUpdated).toLocaleString()}
                      </div>
                    )}
                    <ThemeToggle />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/admin"
                        className="btn bg-gradient-to-r from-primary-light to-primary-dark text-white hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-white"
                      >
                        Admin Portal
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="flex-grow">
              <Routes>
                <Route
                  path="/"
                  element={
                    <main className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-primary-light dark:text-primary-dark mb-4">
                          Arcade Facilitator 2025
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
                          Daily user progress report is here!
                        </p>
                        <div className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-4 shadow-lg">
                          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Your Facilitator Code: <span className="text-primary-light dark:text-primary-dark">GCAF25C1-IN-2JG-GGE</span>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-8">
                        <div>
                          <SearchBar onSearch={handleSearch} />
                        </div>

                        <div className="card bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border-2 border-primary-light/20 dark:border-primary-dark/20">
                          <Leaderboard users={filteredUsers} />
                        </div>
                      </div>
                    </main>
                  }
                />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 