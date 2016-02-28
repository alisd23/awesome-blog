import Author from './Author';

/**
 * Class representing a Blogpost
 */
class Blogpost {
  id      : string;
  title   : string;
  content : string;
  author  : Author;
  image   : string;
  created : Date;
  meta    : any;

  /**
   * Creates a new Blogpost object
   * @param  {string} id
   * @param  {string} title
   * @param  {string} content
   * @param  {User}   author
   * @param  {string} image   - Unique blog image string
   * @param  {Date}   created
   */
  constructor(id, title, content, author, image, created) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.image = image;
    this.created = created;
    this.meta = meta;
  }

  /**
   * Gets the path to the blogpost image or a placeholder
   * @return {String} Absolute path to the blogpost image
   */
  get imageURL() {
    return this.avatar
      ? `/assets/images/posts/${this.image}`
      : `/assets/images/posts/placeholder.jpg`;
  }

  /**
   * Get the number of likes for this post
   * @return {number}
   */
  get likes() {
    return this.meta.likes;
  }
}
