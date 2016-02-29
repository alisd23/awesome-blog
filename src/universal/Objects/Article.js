import Author from './Author';

/**
 * Class representing an Article
 */
export default class Article {
  id      : string;
  title   : string;
  content : string;
  author  : Author;
  image   : string;
  created : Date;
  meta    : any;

  /**
   * Creates a new Article object
   * @param  {string} id
   * @param  {string} title
   * @param  {string} content
   * @param  {User}   author
   * @param  {string} image   - Unique article image string
   * @param  {Date}   created
   * @param  {number} meta.likes
   */
  constructor(article) {
    this.id = article.id || article._id;
    this.title = article.title;
    this.content = article.content;
    this.author = article.author;
    this.image = article.image;
    this.created = article.created;
    this.meta = article.meta;
  }

  /**
   * Gets the path to the article image or a placeholder
   * @return {String} Absolute path to the article image
   */
  get imageURL() {
    return this.avatar
      ? `/assets/images/articles/${this.image}`
      : `/assets/images/articles/placeholder.jpg`;
  }

  /**
   * Get the number of likes for this post
   * @return {number}
   */
  get likes() {
    return this.meta.likes;
  }
}
