
import mongoose from 'mongoose';
import localConfig from '../local.config';

let mongoConnection;

/**
 * Create the MongoDB database connection
 * @return {Object} The mongoose/MongoDB connection
 */
export function connectMongoDB() {
  const DB_URL = 'mongodb://localhost/fruks-blog';

  if (mongoConnection)
    return mongoConnection;

  mongoose.Promise = Promise;
  mongoose.connect(DB_URL);

  mongoConnection = mongoose.connection;

  mongoConnection.on('error', (err) => console.error('MongoDB connection error :(  --  ', err));
  mongoConnection.once('open', function() {
    console.log("MongoDB connected at url - ", DB_URL);
  });

  return mongoConnection;
}
