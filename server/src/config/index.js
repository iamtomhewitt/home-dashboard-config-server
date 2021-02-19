const dotenv = require('dotenv');
const path = require('path');

console.log('before config MONGODB_URI', process.env.MONGODB_URI)
dotenv.config({ path: path.resolve(__dirname, './../../../.env') });
console.log('after config MONGODB_URI', process.env.MONGODB_URI)

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
};
