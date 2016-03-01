
import AuthorModel from '../database/models/Author';
import Author from '../../universal/Objects/Author';

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function getAllAuthors() {
  return AuthorModel.find().exec()
    .then((rawAuthors: any[]) =>
      rawAuthors.map((a) => {
        return new Author(a);
      })
    );
}
