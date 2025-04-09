const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db('leaderboard'); // Using the database name from your connection string
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongoDB();

// Store CSV data
app.post('/api/store-data', async (req, res) => {
  try {
    const { data } = req.body;
    await db.collection('users').deleteMany({}); // Clear existing data
    await db.collection('users').insertMany(data);
    res.json({ message: 'Data stored successfully' });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Failed to store data' });
  }
});

// Get stored data
app.get('/api/get-data', async (req, res) => {
  try {
    const data = await db.collection('users').find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 