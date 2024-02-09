const mongoose = require('mongoose');

/**
 * The name of the database.
 *
 * @type {string}
 */
const dbName = process.env.DB_NAME;

/**
 * Represents the MongoDB URI used to connect to the database.
 *
 * @type {string}
 */
const mongoURI = `mongodb://localhost:27017/${dbName}`;

/**
 * Async function to connect to MongoDB database.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} - A promise that resolves when the connection to the MongoDB database is established.
 * @throws {Error} A general error object if the connection fails.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
