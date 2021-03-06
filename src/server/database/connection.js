import mongoose from 'mongoose';
import config from '../app.config';

let mongoConnection;

/**
 * Create the MongoDB database connection
 * @return {Object} The mongoose/MongoDB connection
 */
export function connectMongoDB() {
  const DB_URL = `mongodb://${config.mongo_url}/blog`;

  if (mongoConnection)
    return mongoConnection;

  mongoose.Promise = Promise;
  mongoose.connect(DB_URL);

  mongoConnection = mongoose.connection;

  mongoConnection.on('error', (err) => console.error('MongoDB connection error :(  --  ', err));
  mongoConnection.once('open', function() {
    console.log('MongoDB connected at url - ', DB_URL);
  });

  return mongoConnection;
}
