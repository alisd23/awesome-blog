
import User from './User';

/**
 * Class representing a Auther
 */
export default class Author extends User {
  twitterHandle : string;

  /**
   * Converts the author data into an author class instance
   * @param  {Object} author - Can be a fruks user OR a FruksBlog user
   */
  constructor(author) {
    author.isAuthor = true;
    super(author);

    this.twitter = author.twitter;
  }

  /**
   * Gets the link to the authors Twitter page
   * @return {string} Twitter URL
   */
  get twitterURL() {
    return `https://twitter.com/${this.twitter}`;
  }
};
