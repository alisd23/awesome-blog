
import User from '../models/User';
import seeder from './seeder';

export default (connection) => {
  return User.remove({})
    .then(() => {
      const users: User[] = [
        {
          firstname: 'Joe',
          lastname: 'Bloggs',
          username: 'jbloggs',
          password: 'password',
          twitter: 'im_alisd',
          avatar: '1',
          isAuthor: true
        },
        {
          firstname: 'Ali',
          lastname: 'Sheehan-Dare',
          username: 'alisd23',
          password: 'password',
          twitter: 'im_alisd',
          avatar: '2',
          isAuthor: true,
          isAdmin: true
        }
      ];

      return seeder('User', users, User);
    });
}
