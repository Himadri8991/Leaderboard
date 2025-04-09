import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import { User } from '../types';
import { useTheme } from '../context/ThemeContext';
import { LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ADMIN_PASSWORD = '292712110498'; // Admin portal password for file upload

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (error) {
      // Create a siren-like sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a siren effect by modulating the frequency
      oscillator.type = 'sine';
      let frequency = 800;
      let increasing = true;
      
      const interval = setInterval(() => {
        if (increasing) {
          frequency += 50;
          if (frequency >= 1200) increasing = false;
        } else {
          frequency -= 50;
          if (frequency <= 400) increasing = true;
        }
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      }, 50);
      
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      oscillator.start();
      
      const timer = setTimeout(() => {
        oscillator.stop();
        clearInterval(interval);
        setError(false);
      }, 5000); // Play for 5 seconds

      return () => {
        oscillator.stop();
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [error]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      // Redirect to landing page after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  };

  const calculateProgress = (arcadeGames: number, skillBadges: number, triviaGames: number) => {
    // Each completed item is worth 1 point
    return arcadeGames + skillBadges + triviaGames;
  };

  const handleFileUpload = async (file: File) => {
    Papa.parse(file, {
      complete: async (results) => {
        const headers = results.data[0] as string[];
        const data = results.data.slice(1).map((row: any) => {
          const user: any = {};
          headers.forEach((header, index) => {
            // Convert header to lowercase and replace spaces with underscores
            const key = header.toLowerCase().replace(/\s+/g, '_');
            // Convert numeric values to numbers
            const value = ['skill_badges', 'arcade_games', 'trivia_games', 'lab_free_courses', 'total_progress'].includes(key)
              ? parseInt(row[index]) || 0
              : row[index];
            user[key] = value;
          });
          return user;
        });

        try {
          const response = await fetch('/api/store-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
          });

          if (!response.ok) {
            throw new Error('Failed to store data');
          }

          setFile(file);
          setError(false);
          
          // Show success message
          alert('Data uploaded successfully!');
          
          // Navigate to home page
          navigate('/');
        } catch (error) {
          console.error('Error storing data:', error);
          setError(true);
          alert('Error uploading data. Please try again.');
        }
      },
      header: true,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`card p-8 max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl border-2 ${
            error ? 'border-red-500 animate-pulse' : 'border-primary-light dark:border-primary-dark'
          }`}
        >
          <div className="text-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <LockClosedIcon className={`h-16 w-16 mx-auto mb-4 ${
                error ? 'text-red-500' : 'text-primary-light dark:text-primary-dark'
              }`} />
            </motion.div>
            <h2 className={`text-3xl font-bold ${
              error ? 'text-red-500' : 'text-primary-light dark:text-primary-dark'
            }`}>
              Admin Portal Access
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Please enter the admin password to access the file upload section
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 font-semibold"
                >
                  Wrong password! Access denied.
                </motion.p>
              )}
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg border-2 ${
                error 
                  ? 'bg-red-500 text-white border-red-600 hover:bg-red-600' 
                  : 'bg-gradient-to-r from-primary-light to-primary-dark text-white border-transparent hover:border-white'
              }`}
            >
              <span>Submit</span>
              <ArrowRightIcon className="h-5 w-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-8 text-center">
          Upload Daily Progress
        </h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </motion.div>
    </div>
  );
}; 