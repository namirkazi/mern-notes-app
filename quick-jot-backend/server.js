require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
// ✅ IMPORTANT: This middleware MUST come BEFORE your routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// Test Route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Your Routes
app.use('/api/users', require('./routes/userRoutes'));

// Note Routes
app.use('/api/notes', require('./routes/noteRoutes')); // <-- ADD THIS LINE

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});