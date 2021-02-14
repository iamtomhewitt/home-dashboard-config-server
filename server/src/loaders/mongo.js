const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Cannot connect to MongoDB:'));
  db.once('open', () => {
    console.log('Connected to MongoDB!');
  });
};
