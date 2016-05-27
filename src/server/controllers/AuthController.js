import UserModel from '../database/models/User';
import User from '../../universal/Objects/User';

/**
 * Checks user details against the database
 * @return {Promise} Resolves to the new user
 */
export function login({ username, password }) {
  return UserModel
    .findOne({ username })
    .exec()
    .then(user => {
      if (!user) throw err;
      return user.comparePassword(password);
    });
}

/**
 * Register a new user to the database
 * @return {Promise} Resolves to the new user
 */
export function register({ name, username, password }) {
  const errors = [];
  const [firstname, lastname] = name.split(' ');

  const newUser = new UserModel({
    firstname,
    lastname,
    username,
    password
  });
  return newUser
    .save()
    .then((nUser) => (console.log('REGISTERED', nUser), newUser));
}

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function findUser(_id: string) {
  return UserModel
    .findOne({ _id })
    .exec()
    .then((rawUser) => rawUser ? new User(rawUser) : null);
}
