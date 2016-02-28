
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogpostSchema = new Schema({
  title   : String,
  content : String,
  image   : String,
  author  : { type: Schema.Types.ObjectId, ref: 'Author' },
  created : { type: Date, default: Date.now },
  meta: {
    likes: { type: Number, default: 0 }
  }
});

export default mongoose.model('Blogpost', blogpostSchema);
