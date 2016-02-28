
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstname : String,
  lastname  : String,
  avatar    : String,
  created   : { type: Date, default: Date.now }
});

export default mongoose.model('Author', authorSchema);
