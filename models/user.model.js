import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// modules //
 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Email regex validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'] // Optional but recommended
  },
  profile: {
    type: String,
    default: '' // No default provided in your spec, so using empty string
  },
  followers: {
    type: Number,
    default: 0,
    min: [0, 'Followers count cannot be negative']
  },
  following: {
    type: Number,
    default: 0,
    min: [0, 'Following count cannot be negative']
  },
  userBio: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});
// schema //

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hash(this.password, 8);
  next();
});
// Hooks //

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};
// Schema Methods // 

const User = mongoose.model('User', userSchema);
// Model // 

export default User;
