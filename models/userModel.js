const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Please enter your age'],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please enter your city'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

