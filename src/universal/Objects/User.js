
/**
 * Class representing a User
 */
export default class {
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
  constructor(id, firstname, lastname, avatar, created) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.avatar = avatar;
    this.created = created;
  }

  /**
   * Gets the path to the avatar image or a placeholder
   * @return {String} Absolute path to the avatar image
   */
  avatarURL() {
    return this.avatar
      ? `/assets/images/avatars/${this.avatar}.jpg`
      : `/assets/images/avatars/placeholder.jpg`;
  }
}
