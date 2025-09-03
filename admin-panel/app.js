const express = require('express');
require('dotenv/config');
require('./database/db').connect();
const cors = require('cors');
const path = require('path');
const expense = require("./routes/expense.routes.js");
const { swaggerSpec, swaggerUi }= require("./database/swagger.config.js")
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// CORS Configuration
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Serve static files from the main directory
app.use(express.static(path.join(__dirname, '/')));

// Serve images
app.use('/images', express.static(path.resolve('./images')));

// API Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const commonRoutes = require('./routes/common');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', commonRoutes);
app.use("/api/expense", expense);
// Health check route
app.get('/', (req, res) => {
  res.send({ message: 'working' });
});

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
