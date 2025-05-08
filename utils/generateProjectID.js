// utils/idGenerator.js
const { v4: uuidv4 } = require('uuid');

module.exports = function generateID() {
  return `NGW-${uuidv4().split('-')[0].toUpperCase()}`;
}