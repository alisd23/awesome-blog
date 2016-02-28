
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id       : Schema.Types.ObjectId,
  firstname : String,
  lastname  : String,
  created   : { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
