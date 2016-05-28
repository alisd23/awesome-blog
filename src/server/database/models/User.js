import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

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
  username    : { type: String, required: true, index: { unique: true } },
  password    : { type: String, required: true },
  firstname   : { type: String, required: true },
  lastname    : String,
  twitter     : String,
  avatar      : String,
  created     : { type: Date, default: Date.now },
  isAuthor    : { type: Boolean, default: false },
  isAdmin     : { type: Boolean, default: false }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

/**
 * User model methods
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(this);
    });
  });
};


// Duplicate the ID field.
userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', { virtuals: true });

export default mongoose.model('User', userSchema);
