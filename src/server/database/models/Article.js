
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Article schema
 * @param {ObjectId}  _id
 * @param {string}    title
 * @param {string}    content
 * @param {string}    image
 * @param {Author}    author
 * @param {Date}      created
 * @param {number}    meta.likes
 */
const articleSchema = new Schema({
  title   : String,
  content : String,
  image   : String,
  author  : { type: Schema.Types.ObjectId, ref: 'Author' },
  created : { type: Date, default: Date.now },
  meta: {
    likes: { type: Number, default: 0 }
  }
});

export default mongoose.model('Article', articleSchema);
