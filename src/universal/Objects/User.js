import config from '../../server/app.config';

/**
 * Class representing a User
 */
export default class User {
  id        : string;
  firstname : string;
  lastname  : string;
  avatar    : string;
  created   : Date;
  twitter   : string;

  /**
   * Creates a new user object
   * @param  {string} id
   * @param  {string} firstname
   * @param  {string} lastname
   * @param  {string} avatar    - Unique Avatar image string
   * @param  {Date}   created   - [description]
   */
  constructor(user) {
    this.id = user.id || user._id;
    this.firstname = user.firstname;
    this.lastname = user.lastname || '';
    this.username = user.username;
    this.created = user.created;
    this.twitter = user.twitter;
    // If the user is an author we can assume that they have a 'fruks-blog'
    // account so can use the avatar from there
    this.isAuthor = !!user.isAuthor;
    // If user is an author, get image from fruksBlog server
    // otherwise look in fruksWeb server
    this.avatar = this.isAuthor ? user.avatar : user.image;
  }

  /**
   * Gets the path to the avatar image or a placeholder
   * @return {String} Absolute path to the avatar image
   */
  get avatarURL() {
    return this.avatar
      ? `/assets/images/avatars/${this.avatar}.jpg`
      : `/assets/images/avatars/placeholder.jpg`;
  }

  /**
   * Gets the users fullname, first and last concatenated
   * @return {string}
   */
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }

  /**
   * Gets the link to the authors Twitter page
   * @return {string} Twitter URL
   */
  get twitterURL() {
    return `https://twitter.com/${this.twitter}`;
  }
}
