
import mongoose from 'mongoose';
import knex from 'knex';
import config from '../config.js';

knex.Promise = Promise;

let mongoConnection;
let sqlConnection;

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

/**
 * Create the MySQL database connection
 * @return {Object} Knex MySQL object
 */
export function connectMySql() {
  if (sqlConnection)
    return sqlConnection;

  sqlConnection = knex({
    client: 'mysql',
    connection: {
      host      : config.sql.host,
      user      : config.sql.user,
      password  : config.sql.password,
      database  : config.sql.database,
      port      : config.sql.port
    },
    debug: process.NODE_ENV !== 'production'
  });

  return sqlConnection;
}
