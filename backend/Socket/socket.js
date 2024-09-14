import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        method: ['GET', 'POST']
    }

})

const userSocketmap = {}; //this map stores socket id corresponding the user id; userid

export const getReceiverSocketId = (receiverId) => userSocketmap[receiverId]

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketmap[userId] = socket.id;
        console.log(`User connected with id: ${userId} , socket: ${socket.id}`);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketmap));

    socket.on('disconnect', (socket) => {
        if (userId) {
            console.log(`User disconnected with id: ${userId} , socket: ${socket.id}`);
            delete userSocketmap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketmap));
    })

})

export { app, server, io }

