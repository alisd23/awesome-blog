
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Article schema
 * @param {ObjectId}  _id
 * @param {string}    title
 * @param {string}    content
 * @param {string}    image
 * @param {User}      author
 * @param {Date}      created
 * @param {number}    meta.likes  - Array of FruksWeb ids which have liked the article
 */
const articleSchema = new Schema({
  title   : String,
  content : String,
  image   : String,
  author  : { type: Schema.Types.ObjectId, ref: 'User' },
  created : { type: Date, default: Date.now },
  meta: {
    likes: { type: [String], default: [] }
  }
});

// Duplicate the ID field.
articleSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
articleSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Article', articleSchema);
