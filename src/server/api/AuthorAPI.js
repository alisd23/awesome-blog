
import { getAuthors as getAuthorsCtrl } from '../controllers/ArticleController';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getAuthors(req, res) {
  getAuthorsCtrl()
    .then((authors: Author[]) => {
      res.status(200).send({
        success: 1,
        authors: authors
      });
    })
    .catch((err) => {
      console.log("GetAuthors ERROR - ", err);
      res.status(400).send({
        success: 0,
        error: `Could not get authors - ${err}`
      });
    });
}


export default {
  getAuthors
}
