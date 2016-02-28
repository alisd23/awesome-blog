
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * User schema
 * @param {ObjectId}  _id
 * @param {string}    title
 * @param {string}    content
 * @param {string}    image
 * @param {User}      author
 * @param {Date}      created
 * @param {number}    meta.likes
 */
const blogSchema = new Schema({
  _id     : Schema.Types.ObjectId,
  title   : String,
  content : String,
  image   : String,
  author  : { type: Schema.Types.ObjectId, ref: 'User' },
  created : { type: Date, default: Date.now },
  meta: {
    likes: Number
  }
});

export default mongoose.model('Blog', blogSchema);
