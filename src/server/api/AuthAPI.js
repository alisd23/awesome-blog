
import jwt from 'jsonwebtoken';
import config from '../config.js';
import Author from '../../universal/Objects/Author.js';
import User from '../../universal/Objects/User.js';
import { getUser } from '../database/sql/commands.js';
import { findAuthor } from '../controllers/AuthorController';

/**
 * Handler for the token authentication route. Token retrieved from FruksWeb Server
 * is decrypted using the same app key,
 * @return {void}
 */
export function authenticateWithToken(req, res) {
  const { token } = req.params;

  if (!token)
    res.status('400').send('Token Authentication failed');

  // Verify and Decode JWT token
  jwt.verify(token, config.app_key, (err, decoded) => {
    if (err || !decoded) {
      console.error('JWT decoding failed', err);
    } else {
      getUser(decoded.id)
        .then(user => {
          req.session.user = user;
          return findAuthor(user.id);
        })
        .then(author => {
          req.session.user = author
            ? new Author({
              ...author,
              id: req.session.user.id   // Meed to use FruksWeb id ALWAYS for likes
            })
            : new User(req.session.user);

          res.status(200).send({
            success: 1,
            user: req.session.user
          });
        })
        .catch(err => res.status('500').send({ err: `Get user failed - ${err}`}));
    }
  });
}

export default {
  authenticateWithToken
}
