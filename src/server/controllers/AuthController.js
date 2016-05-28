import UserModel from '../database/models/User';

export function login({ username, password }) {
  return UserModel
    .findOne({ username })
    .exec()
    .then(user => {
      if (!user) throw err;
      return user.comparePassword(password);
    });
}

export function register({ name, username, password }) {
  const errors = [];
  const [firstname, lastname] = name.split(' ');

  const newUser = new UserModel({
    firstname,
    lastname,
    username,
    password
  });
  return newUser.save();
}

export function findUser(_id: string) {
  return UserModel
    .findOne({ _id })
    .exec();
}
