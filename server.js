require('dotenv').config();

const express = require('express');
const { connectDB } = require('./config/db');

const mongoRoutes = require('./routes/mongoProductRoutes');
const sqlRoutes = require('./routes/sqlProductRoutes');

const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Connexion MongoDB
connectDB();

// Routes MongoDB
app.use('/api/mongo/products', mongoRoutes);

// Routes MySQL
app.use('/api/sql/products', sqlRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});