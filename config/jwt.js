const crypto = require('crypto');

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 90
};

// const crypto = require('crypto');

// const daysToSeconds = (days) => days * 24 * 60 * 60;

// module.exports = {
//   JWT_SECRET: process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex'),
//   // Setting JWT expiration to 90 days in seconds (90 days * 24 hours * 60 minutes * 60 seconds)
//   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || daysToSeconds(90),  // 90 days in seconds
//   // Cookie expiration in seconds, could be set to a number of seconds
//   JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 90 * 24 * 60 * 60  // 90 days in seconds
// };
