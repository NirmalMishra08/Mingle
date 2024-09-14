import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Refers to the User model
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message' // Corrected to refer to the Message model
        }
    ]
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

export const Conversation = mongoose.model('Conversation', conversationSchema);
