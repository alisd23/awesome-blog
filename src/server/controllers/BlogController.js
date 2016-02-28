
import BlogModel from '../database/models/Blog';
import Blog from '../../universal/Objects/Blog';

/**
 * Get ALL the blogs from the database
 * @return {Promise} Resolves to an array of blogs
 */
export function getAllBlogs(req, res) {
  return BlogModel.find()
    .then((rawBlogs: any[]) =>
      rawBlogs.map((blog) => {
        const test = { id, title, content, author, created, meta } = blog;
        new Blog(id, title, content, author, created, meta);
      })
    );
}
