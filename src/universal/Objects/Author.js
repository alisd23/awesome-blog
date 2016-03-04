
import User from './User';

/**
 * Class representing a Auther
 */
export default class Author extends User {

  /**
   * Converts the author data into an author class instance
   * @param  {Object} author - Can be a fruks user OR a FruksBlog user
   */
  constructor(author) {
    author.isAuthor = true;
    super(author);
  }

};
