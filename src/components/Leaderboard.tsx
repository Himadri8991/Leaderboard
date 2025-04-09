import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { TrophyIcon, LinkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface LeaderboardProps {
  users: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Use the fetched data if available, otherwise use the prop data
  const displayUsers = leaderboardData.length > 0 ? leaderboardData : users;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
              Pos
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-48">
              User Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-48">
              Profile URL
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
              Milestone
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
              Skill Badges
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
              Arcade Games
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
              Trivia Games
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
              Lab-free Courses
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {displayUsers.map((user, index) => (
            <tr
              key={user.id}
              className="group hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors duration-200"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {index < 3 ? (
                    <TrophyIcon className={`h-5 w-5 mr-2 ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                  ) : null}
                  {index + 1}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <motion.div
                  whileHover={{ scale: 1.1, x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer inline-block"
                >
                  {user.name}
                </motion.div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <motion.a
                  href={user.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
                >
                  <LinkIcon className="h-4 w-4 mr-1" />
                  View Profile
                </motion.a>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.profileStatus === 'All Good' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {user.profileStatus}
                </motion.span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.milestoneEarned}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.skillBadges}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.arcadeGames}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.triviaGames}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.labFreeCourses}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 