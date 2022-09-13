const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

function connectDB(callback) {
  mongoose.connect(MONGODB_URI);
  mongoose.connection.on('error', (err) => {
    console.error('Database Error', err);
  });
  mongoose.connection.on('connected', callback);
}

module.exports = { connectDB };
