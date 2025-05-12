const mongoose = require('mongoose');
const { Schema } = mongoose;

const interactionSchema = new Schema(
    {
        postId: {
        type: Schema.Types.ObjectId, 
        ref: 'Post',
        required: [true, 'Please enter PostID.'],
        },
        userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Please enter UserID.'],
        },
        type: {
        type: String,
        enum: ['like', 'dislike', 'comment'],
        required: [true, 'Please enter interaction type'],
        },
        text: {
        type: String,
        required: function () {
            return this.type === 'comment';
        },
        },
    },
    {
        timestamps: true,
    }
    );

    module.exports = mongoose.model('Interaction', interactionSchema);