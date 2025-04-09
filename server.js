const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Sample user data
const users = [
  {
    id: 1,
    name: 'John Doe',
    profileUrl: 'https://example.com/johndoe',
    profileStatus: 'Active',
    milestoneEarned: 'Level 5',
    skillBadges: 12,
    arcadeGames: 8,
    triviaGames: 15,
    labFreeCourses: 5,
    totalProgress: 75
  },
  {
    id: 2,
    name: 'Jane Smith',
    profileUrl: 'https://example.com/janesmith',
    profileStatus: 'Active',
    milestoneEarned: 'Level 3',
    skillBadges: 8,
    arcadeGames: 5,
    triviaGames: 10,
    labFreeCourses: 3,
    totalProgress: 60
  },
  {
    id: 3,
    name: 'Bob Johnson',
    profileUrl: 'https://example.com/bobjohnson',
    profileStatus: 'Inactive',
    milestoneEarned: 'Level 2',
    skillBadges: 5,
    arcadeGames: 3,
    triviaGames: 7,
    labFreeCourses: 2,
    totalProgress: 45
  }
];

// API endpoint to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 