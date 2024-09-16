//for chatting

import { getReceiverSocketId } from "../Socket/socket.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

import { io } from "../Socket/socket.js";
export const sendMessage = async (req, res) => {
    try {
      const senderId = req.id;  // Assuming this is retrieved from an authenticated request
      const receiverId = req.params.id;
      console.log(senderId, receiverId);
  
      const { textMessage: message } = req.body;
  
      // Check if a conversation already exists between the sender and receiver
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      });
      console.log(conversation);
  
      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
          messages: []
        });
      }
  
      // Create a new message
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message
      });
      console.log(newMessage);
  
      // Add the new message to the conversation's message array
      conversation.messages.push(newMessage._id);
  
      // Save the conversation (since you've already created and saved the new message)
      await conversation.save();
  
      // Implement Socket.IO for real-time message transfer
      const receiverSocketId = getReceiverSocketId(receiverId);  // Ensure this function is defined elsewhere
  
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
      }
  
      return res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: newMessage
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while sending the message',
        
      });
    }
  };
  

export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages')
        if (!conversation) return res.status(200).json({
            success: true,
            message: []
        })
        return res.status(200).json({
            success: true,
            message: conversation?.messages
        })
    } catch (error) {
        console.log(error)
    }
}