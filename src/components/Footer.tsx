import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-400"
          >
            Made with ❤️ by Facilitators
          </motion.p>
          <div className="flex space-x-4">
            <motion.a
              href="https://www.linkedin.com/in/himadri-das-27487324a/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 hover:text-blue-300 transition-colors duration-300"
            >
              Himadri
            </motion.a>
            <span className="text-gray-400">&</span>
            <motion.a
              href="https://www.linkedin.com/in/priyanka-banerjee-42239028a/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 hover:text-blue-300 transition-colors duration-300"
            >
              Priyanka
            </motion.a>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-gray-500 mt-2"
          >
            © {new Date().getFullYear()} Arcade Facilitator. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 