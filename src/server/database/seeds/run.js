
import { connectMongoDB } from '../connection';
import config from './app.config';
import articleSeeder from './articles';
import authorSeeder from './authors';

// Connect to database
const connection = connectMongoDB(config.mongo_url);

// Run seeds sequentially (due to database references)
const seeders = [
  authorSeeder,
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
