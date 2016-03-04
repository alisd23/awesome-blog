
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { getUser } from '../database/sql/commands.js';

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
          res.status(200).send({
            success: 1,
            user: user
          });
        })
        .catch(err => res.status('500').send({ err: `Get user failed - ${err}`}));
    }
  });
}

export default {
  authenticateWithToken
}
