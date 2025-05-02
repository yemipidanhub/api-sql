// config/db.js
const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
  process.env.SQL_DB_NAME,
  process.env.SQL_DB_USER,
  process.env.SQL_DB_PASSWORD,
  {
    host: process.env.SQL_DB_HOST,
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    logging: false, // disable SQL logging, or set to console.log to enable
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL Database Connection Established');
    logger.info(`SQL Database Connected: ${process.env.SQL_DB_HOST}`);
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
