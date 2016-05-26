import User from '../../universal/Objects/User';
import {
  login as loginCtrl,
  register as registerCtrl
} from '../controllers/AuthController';

/**
 * Login given username and password
 * @return {void}
 */
export function login(req, res) {
  const { username, password } = req.body;

  loginCtrl(username, password)
    .then(user => {
      req.session.user = user;
      res
        .status(200)
        .send({
          success: true,
          user
        });
    })
    .catch(err =>
      res
        .status(400)
        .send({
          success: false,
          error: err
        })
    );
}

/**
 * Register given username and password
 * @return {void}
 */
export function register(req, res) {
  const { username, password } = req.body;

  res.send(new User({
    id: 'test',
    firstname: 'Test',
    lastname: 'User',
    created: Date.now()
  }), 200)
}

export function logout(req, res) {
  req.session.user = null;
  res.status(200).send({
    success: true
  });
}

export default {
  login,
  register,
  logout
}
