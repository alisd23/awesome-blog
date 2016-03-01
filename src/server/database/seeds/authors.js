
import Author from '../models/Author';
import seeder from './seeder';

export default (connection) => {
  return Author.remove({})
    .then(() => {
      const authors: Author[] = [
        {
          firstname: 'Joe',
          lastname: 'Bloggs',
          avatar: '1'
        },
        {
          firstname: 'Ali',
          lastname: 'Sheehan-Dare',
          avatar: '2'
        }
      ];

      return seeder('Author', authors, Author);
    });
}
