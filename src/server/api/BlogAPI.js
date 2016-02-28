
import { getAllBlogs } from '../controllers/BlogController';

/**
 * Retrieve all blogs and send result back to client
 * @return {void}
 */
export function getBlogs(req, res) {
  getBlogs
    .then((blogs: Blog[]) => {
      console.log('GetBlogs - ', blogs);
      res.status(200).send(blogs);
    })
    .catch((err) => {
      console.log("GetBlogs ERROR - ", err);
      res.status(400).send(err);
    });
}

export default {
  getBlogs: getBlogs
}
