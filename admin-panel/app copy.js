const express = require('express');
require('dotenv/config');
require('./database/db').connect();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use((req, res, next) => {
  console.log('Logging Request Headers Middleware:', req.headers.origin);
  next();
});

// const allowlist = ['https://www.habslive.in','https://habslive.in','http://localhost:3000' ];

// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;

//   const origin =  req; // Ensure req.headers is defined and handle undefined origin by setting a default empty string

//   console.log('Request Object:', req);
//   console.log('Origin:', origin);

//   if (!origin) {
//     corsOptions = { origin: false }; // You can adjust this behavior if needed
//     console.log('CORS disabled because Origin is missing.');
//   } else if (allowlist.includes(origin)) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     console.log('CORS enabled for origin:', origin);
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//     console.log('CORS disabled for origin:', origin);
//   }
  
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

const corsOptions = {
  origin: "http://localhost:3000",
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type',
  credentials: true,
};

// Use CORS middleware with the custom options
app.use(cors(corsOptions));


// Serve static files from the main directory
app.use(express.static(path.join(__dirname, '/')));

// Serve images
app.use('/images', express.static(path.resolve('./images')));

// API Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const commonRoutes = require('./routes/common');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', commonRoutes);

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
