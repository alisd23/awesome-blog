
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Author schema
 * @param {ObjectId}  _id
 * @param {Number}    fruksID - The fruks database id (if any) that this author maps to
 * @param {string}    firstname
 * @param {string}    lastname
 * @param {string}    avatar
 * @param {Date}      created
 */
const authorSchema = new Schema({
  fruksID     : Number,
  firstname   : String,
  lastname    : String,
  twitter     : String,
  avatar      : String,
  created     : { type: Date, default: Date.now }
});

export default mongoose.model('Author', authorSchema);
