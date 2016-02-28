
import mongoose from 'mongoose';

/**
 * Create the MongoDB database connection
 * @return {Object} The mongoose/MongoDB connection
 */
export default () => {
  const DB_URL = 'mongodb://localhost/fruks-blog';

  mongoose.Promise = Promise;
  mongoose.connect(DB_URL);

  const connection = mongoose.connection;

  connection.on('error', (err) => console.error('MongoDB connection error :(  --  ', err));
  connection.once('open', function() {
    console.log("MongoDB connected at url - ", DB_URL);
  });

  return connection;
}
