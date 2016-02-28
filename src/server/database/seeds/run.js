
import connect from '../connection';

import blogpostSeeder from './blogposts';
import authorSeeder from './authors';

// Connect to database
const connection = connect();

// Run seeds sequentially (due to database references)
const seeders = [
  authorSeeder,
  blogpostSeeder
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
