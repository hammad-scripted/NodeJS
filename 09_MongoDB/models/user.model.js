import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    salt: String,
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
export default userSchema;
