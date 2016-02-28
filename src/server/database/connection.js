
import mongoose from 'mongoose';

/**
 * Create the MongoDB database connection
 * @return {Object} The mongoose/MongoDB connection
 */
export default () => {
  const DB_URL = 'mongodb://localhost/fruks-blog';

  mongoose.Promise = Promise;
  mongoose.connect(DB_URL);

  const db = mongoose.connection;

  db.on('error', (err) => console.error('MongoDB connection error :(  --  ', err));
  db.once('open', function() {
    console.log("MongoDB connected at url - ", DB_URL);
  });

  return db;
}
