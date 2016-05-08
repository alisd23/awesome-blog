
import AuthorModel from '../database/models/Author';
import Author from '../../universal/Objects/Author';

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function getAuthors() {
  return AuthorModel
    .find().exec()
    .then((rawAuthors: any[]) =>
      rawAuthors.map((a) => {
        return new Author(a);
      })
    );
}

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function findAuthor(_id: string) {
  return AuthorModel
    .findOne({ _id }).exec()
    .then((rawAuthor) => rawAuthor ? new Author(rawAuthor) : null);
}
