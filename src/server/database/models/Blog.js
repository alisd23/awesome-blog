
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  _id     : Schema.Types.ObjectId,
  title   : String,
  content : String,
  author  : { type: Schema.Types.ObjectId, ref: 'User' },
  created : { type: Date, default: Date.now },
  meta: {
    likes: Number
  }
});

export default mongoose.model('Blog', blogSchema);
