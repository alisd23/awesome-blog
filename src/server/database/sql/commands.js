
import { connectMySql } from '../connection';

export function getUser(id) {
  const sql = connectMySql();

  return sql('users')
    .where({ id })
    .first('firstname', 'lastname', 'id', 'image')
    .then((user) => {
      if (!user)
        throw new Error('User not found');

      return user;
    });
}
