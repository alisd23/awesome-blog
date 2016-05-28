import UserModel from '../database/models/User';

export function getAuthors() {
  return UserModel
    .find({ isAuthor: true})
    .exec();
}

export function findAuthor(_id: string) {
  return UserModel
    .findOne({
      _id,
      isAuthor: true
    })
    .exec();
}
