
/**
 * Class representing a User
 */
export default class Author {
  id        : string;
  firstname : string;
  lastname  : string;
  avatar    : string;
  created   : Date;

  /**
   * Creates a new user object
   * @param  {string} id
   * @param  {string} firstname
   * @param  {string} lastname
   * @param  {string} avatar    - Unique Avatar image string
   * @param  {Date}   created   - [description]
   */
  constructor(author) {
    this.id = author.id || author._id;
    this.firstname = author.firstname;
    this.lastname = author.lastname;
    this.avatar = author.avatar;
    this.created = author.created;
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
}
