
import jwt from 'jsonwebtoken';
import localConfig from '../local.config';
import User from '../../universal/Objects/User';

/**
 * login given username and password
 * @return {void}
 */
export function login(req, res) {
  const { username, password } = req.body;

  res.send(new User({
    id: 'test',
    firstname: 'Test',
    lastname: 'User',
    created: Date.now()
  }), 200)
}

export function logout(req, res) {
  res.sendStatus({
    success: true
  }, 200);
}

export default {
  login,
  logout
}
