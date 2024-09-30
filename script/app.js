const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Connect to MongoDB (replace <DB_CONNECTION_STRING> with your MongoDB URI)
mongoose.connect(process.env.DB_CONNECTION_STRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to FitgenAI!');
});

// Set port and listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');

app.use('/api/user', authRoutes);
