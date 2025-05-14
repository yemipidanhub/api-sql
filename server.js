
require('dotenv').config({
  // path: `.env.production`,
  path: '.env.development'
});
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
// const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { connectDB, sequelize } = require('./config/db');
const mysqlConnection = require("./config/mysql2")
const errorHandler = require('./middlewares/errorMiddleware');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes'); 
const reportRoutes = require('./routes/reportRoutes');

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
  origin: ['https://ngwater.app', 'https://www.ngwater.app', 'http://localhost:5173'],
  credentials: true
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for uploaded files if needed)
// app.use('/uploads', express.static('uploads')); // Uncomment if using local uploads

// Routes
app.use('/api/projects', projectRoutes); // Changed from /api/forms to /api/projects
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/reports', reportRoutes);
// app.use('/api/v1/upload', uploadRoute); // Remove if using Cloudinary instead
// Turn off ETag generation
// app.disable('etag');
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
      <li><a href="/api/projects/stage-a">Stage A Form</a></li>
      <li><a href="/api/projects/stage-b">Stage B Form</a></li>
      <li><a href="/api/projects/stage-c">Stage C Form</a></li>
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
app.get('/mysql2-test', async (req, res, next) => {
  try {
    const [results] = await mysqlConnection.query("SELECT 1+1 AS result");
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
  Environment: ${process.env.NODE_ENV || 'development'}
  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not Configured'}
  `);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});