const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes Imports
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/roomma', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Room.ma API is running 🚀');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur serveur est survenue' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});