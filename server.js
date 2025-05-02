require("dotenv").config({
  // path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
  path: process.env.NODE_ENV === ".env",
});
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");
const User = require("./models/User.model");
const bcrypt = require("bcryptjs");

// import User from './models/User.model';

const app = express();

// Database connection
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
const allowedOrigins = ["http://localhost:5173", "https://ngwater.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api", limiter);

// Data sanitization
// Custom sanitization function
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (!obj) return obj;
    return Object.keys(obj).reduce((acc, key) => {
      // Remove any keys starting with $ (Mongo operators)
      if (key.startsWith("$")) return acc;
      acc[key] = typeof obj[key] === "object" ? sanitize(obj[key]) : obj[key];
      return acc;
    }, {});
  };

  req.query = sanitize(req.query);
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);
  next();
});

// app.use(xss());
// app.use(hpp());

// Routes
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/projects", require("./routes/project.routes"));
app.use("/api/v1/admin", require("./routes/admin.routes"));
app.use("/api/v1/uploads", require("./routes/upload.routes"));
app.use("/api/v1/reports", require("./routes/report.routes"));

// Error handling middleware
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
process.on("uncaughtException", (err) => {
  logger.error(`Unhandled Exception: ${err.message}`);
  server.close(() => process.exit(1));
});

// Admin creation logic
// const createAdminIfNotExists = async () => {
//   try {
//     const existingAdmin = await User.findOne({ role: 'admin' });
//     if (!existingAdmin) {
//       const password = 'admin105'; // Set your admin password
//       const hashedPassword = await bcrypt.hash(password, 12);

//       const admin = new User({
//         name: 'myadmin',
//         email: 'admin@ngw.com',
//         phoneNumber: '1234567890',
//         password: hashedPassword,
//         role: 'admin',
//         specialization: 'admin',
//         licenseType: 'admin',
//         licenseBody: 'Admin License Body',
//         licenseNumber: 'Admin License Number',
//         state: 'Admin State',
//         userLGA: 'Admin LGA',
//         address: 'Admin Address',
//         isVerified: true, // Optional: Make admin verified
//       });

//       await admin.save();
//       logger.info('Admin account created successfully.');
//     } else {
//       logger.info('Admin account already exists.');
//     }
//   } catch (err) {
//     logger.error('Error creating admin:', err);
//   }
// };

// createAdminIfNotExists();

// const deleteAdmin = async () => {
//   try {
//     const result = await User.deleteMany({ role: 'admin' });
//     logger.info(`Deleted ${result.deletedCount} admin(s).`);
//   } catch (err) {
//     logger.error(`Error deleting admin(s): ${err.message}`);
//   }
// };

// deleteAdmin();
