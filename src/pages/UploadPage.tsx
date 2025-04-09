import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const UploadPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [error, setError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '292712110498') {
      setShowPasswordInput(false);
      setError(false);
    } else {
      setError(true);
      // Create and play siren sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.5);
      oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 1);
      
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      
      oscillator.start();
      
      // Redirect after 5 seconds
      setTimeout(() => {
        oscillator.stop();
        navigate('/');
      }, 5000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const text = await file.text();
      const results = Papa.parse(text, { header: true });
      
      // Process the data
      const processedData = results.data.map((row: any) => {
        const arcadePoints = parseInt(row['Arcade Games Completed']) || 0;
        const skillPoints = parseInt(row['Skill Badges Completed']) || 0;
        const triviaPoints = parseInt(row['Trivia Games Completed']) || 0;
        
        // Calculate total progress with weights
        const totalProgress = (arcadePoints * 1.5) + (skillPoints * 2) + (triviaPoints * 1);
        
        return {
          ...row,
          totalProgress,
          position: 0 // Will be set after sorting
        };
      });

      // Sort by total progress and assign positions
      processedData.sort((a: any, b: any) => b.totalProgress - a.totalProgress);
      processedData.forEach((item: any, index: number) => {
        item.position = index + 1;
      });

      // Send to backend
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        alert('Data uploaded successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      {showPasswordInput ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mt-20"
        >
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-all duration-300 ${
            error ? 'border-2 border-red-500 animate-pulse bg-red-50 dark:bg-red-900/20' : ''
          }`}>
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: error ? [0, -10, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className={`w-12 h-12 mx-auto ${error ? 'text-red-500' : 'text-blue-500'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </motion.div>
              <h2 className={`mt-4 text-2xl font-bold ${error ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                Admin Access
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Enter the password to access the upload section
              </p>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''
                    }`}
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    error ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  Submit
                </motion.button>
              </div>
            </form>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-red-500 font-medium"
              >
                Wrong password! Access denied. Redirecting to home page...
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mt-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Upload CSV File
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={uploading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadPage; 