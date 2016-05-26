
import { connectMongoDB } from '../connection';
import config from '../../app.config';
import articleSeeder from './articles';
import userSeeder from './users';

// Connect to database
const connection = connectMongoDB(config.mongo_url);

// Run seeds sequentially (due to database references)
const seeders = [
  userSeeder,
  articleSeeder
];

seeders
  .reduce((cur, next) => {
    return cur(connection).then(() => next(connection));
  })
  .then(() => {
    console.log('Seeding Complete');
    process.exit();
  })
  .catch((err) => {
    console.log('Seeding Failed - ', err);
    process.exit();
  });
