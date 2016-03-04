
import Author from '../models/Author';
import seeder from './seeder';

export default (connection) => {
  return Author.remove({})
    .then(() => {
      const authors: Author[] = [
        {
          fruksID: 2, // Alex
          firstname: 'Joe',
          lastname: 'Bloggs',
          avatar: '1'
        },
        {
          fruksID: 3, // Ali
          firstname: 'Ali',
          lastname: 'Sheehan-Dare',
          avatar: '2'
        }
      ];

      return seeder('Author', authors, Author);
    });
}
