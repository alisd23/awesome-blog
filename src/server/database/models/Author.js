
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Author schema
 * @param {ObjectId}  _id
 * @param {string}    firstname
 * @param {string}    lastname
 * @param {string}    avatar
 * @param {Date}      created
 */
const authorSchema = new Schema({
  firstname : String,
  lastname  : String,
  avatar    : String,
  created   : { type: Date, default: Date.now }
});

export default mongoose.model('Author', authorSchema);
