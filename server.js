// require('dotenv').config({
//   path: `.env.production`,
// });

require('dotenv').config(); // <-- loads default .env

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
// const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { connectDB, sequelize } = require('./config/db');
const formRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to database
connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
const corsOptions = {
  origin: ['https://ngwater.app', 'https://www.ngwater.app'],
  credentials: true
};
app.use(cors(corsOptions));


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for uploaded files)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);


// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Test routes
app.get('/', (req, res) => {
  res.send(`
    <h1>API Status: Running</h1>
    <h2>Endpoints:</h2>
    <ul>
      <li><a href="/xampp-test">Database Test</a></li>
      <li><a href="/test-user">User Test</a></li>
    </ul>
  `);
});


app.get('/xampp-test', async (req, res, next) => {
  try {
    const [results] = await sequelize.query("SELECT 1+1 AS result");
    res.json({
      status: 'success',
      database: 'connected',
      result: results[0].result
    });
  } catch (error) {
    next(error); // Let the error middleware handle it
  }
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  Server running on http://localhost:${PORT}
  XAMPP MySQL: ${process.env.DB_HOST}:${process.env.DB_PORT}
  `);
});


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});