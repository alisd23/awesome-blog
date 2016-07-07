import UserModel from '../database/models/User';
import validate from './validate';
import { registerConstraints, profileConstraints, changePasswordConstraints }
  from '../../universal/validation/auth';

const errorMessages = {
  11000: 'Username already exists'
};


export function login({ username, password }) {
  return UserModel
    .findOne({ username })
    .exec()
    .then(user => {
      if (!user) throw 'Invalid login details';
      return user.comparePassword(password);
    });
}

export function register({ name, username, password }) {
  const [firstname, lastname] = name.split(' ');
  const values = { firstname, lastname, username, password };
  const errors = validate(values, registerConstraints.server);

  if (errors)
    return Promise.reject(errors);

  const newUser = new UserModel(values);
  return newUser
    .save()
    .catch(e => { throw errorMessages[e.code] });
}

export function updateProfile({ username, name, id }) {
  const [firstname, lastname] = name.split(' ');
  const values = { firstname, lastname, username };
  const errors = validate(values, profileConstraints.server);

  if (errors)
    return Promise.reject(errors);

  return UserModel
    .findOneAndUpdate(
      { _id: id },
      { $set: values},
      { new: true }
    )
    .exec();
}

export function changePassword(values) {
  const errors = validate(values, changePasswordConstraints);

  if (errors)
    return Promise.reject(errors);

  return UserModel
    .findOne({ _id: values.id })
    .exec()
    .then(user => user.comparePassword(values.currentPassword))
    .then(user => {
      user.password = values.newPassword;
      return user.save();
    });
}

export function findUser(_id: string) {
  return UserModel
    .findOne({ _id })
    .exec();
}
