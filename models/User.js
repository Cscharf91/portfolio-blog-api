import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4
  },
  email: {
    type: String,
    required: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 25,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);
export default User;