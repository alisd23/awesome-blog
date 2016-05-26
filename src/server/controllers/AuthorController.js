import UserModel from '../database/models/User';
import User from '../../universal/Objects/User';

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function getAuthors() {
  return UserModel
    .find({ isAuthor: true})
    .exec()
    .then((rawAuthors: User[]) =>
      rawAuthors.map((a) => new User(a))
    );
}

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function findAuthor(_id: string) {
  return UserModel
    .findOne({
      _id,
      isAuthor: true
    })
    .exec()
    .then((rawAuthor) => rawAuthor ? new User(rawAuthor) : null);
}
