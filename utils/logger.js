const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors, json } = format;
const path = require('path');

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (stack) {
    log += `\n${stack}`;
  }
  return log;
});

// Custom format for file output
const fileFormat = printf(({ level, message, timestamp, stack }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (stack) {
    log += `\n${stack}`;
  }
  return log;
});

// Create different transports based on environment
const getTransports = () => {
  const transportList = [
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      format: combine(timestamp(), errors({ stack: true }), fileFormat)
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
      format: combine(timestamp(), errors({ stack: true }), fileFormat)
    })
  ];

  if (process.env.NODE_ENV !== 'production') {
    transportList.push(
      new transports.Console({
        format: combine(
          colorize(),
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          errors({ stack: true }),
          consoleFormat
        )
      })
    );
  }

  return transportList;
};

// Create the logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: getTransports(),
  exitOnError: false
});

// Add a stream for morgan to use winston
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// Handle uncaught exceptions
logger.exceptions.handle(
  new transports.File({
    filename: path.join(__dirname, '../../logs/exceptions.log'),
    format: combine(timestamp(), errors({ stack: true }), json())
  })
);

// Handle unhandled promise rejections
logger.rejections.handle(
  new transports.File({
    filename: path.join(__dirname, '../../logs/rejections.log'),
    format: combine(timestamp(), errors({ stack: true }), json())
  })
);

module.exports = logger;