const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
    {
      title: {
        type: String,
        required: [true, 'Please enter Post Title'],
        trim: true,
      },
      text: {
        type: String,
        required: [true, 'Please enter Post Text'],
        trim: true,
      },
      userId: {
        type: Schema.Types.ObjectId, // Relazione con User
        ref: 'User',
        required: [true, 'Please enter UserID.'],
      },
    },
    {
      timestamps: true 
    }
  );
  

module.exports = mongoose.model('Post', postSchema); 

