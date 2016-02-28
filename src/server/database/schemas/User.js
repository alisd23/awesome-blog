
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * User schema
 * @param {ObjectId}  _id
 * @param {string}    firstname
 * @param {string}    lastname
 * @param {string}    avatar
 * @param {Date}      created
 */
const userSchema = new Schema({
  _id       : Schema.Types.ObjectId,
  firstname : String,
  lastname  : String,
  avatar    : String,
  created   : { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
