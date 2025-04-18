const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated!', userId: req.user.id });
});

// Start server
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
