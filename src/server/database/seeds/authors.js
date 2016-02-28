
import Author from '../models/Author';
import seeder from './seeder';

export default (connection) => {
  return Author.remove({})
    .then(() => {
      const authors: Author[] = [
        {
          firstname: 'Joe',
          lastname: 'Bloggs',
          avatar: ''
        },
        {
          firstname: 'Ali',
          lastname: 'Sheehan-Dare',
          avatar: ''
        }
      ];

      return seeder('Author', authors, Author);
    });
}
