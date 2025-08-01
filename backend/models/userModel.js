import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  baseURL: { 
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
export default User;
