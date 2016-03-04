
import { getAllAuthors } from '../controllers/ArticleController';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getAuthors(req, res) {
  getAllAuthors()
    .then((authors: Author[]) => {
      console.log('GetAuthors - ', authors);
      res.status(200).send(authors);
    })
    .catch((err) => {
      console.log("GetAuthors ERROR - ", err);
      res.status(400).send(err);
    });
}

export default {
  getAuthors
}
