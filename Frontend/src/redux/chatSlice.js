import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({

    name: "chat",
    initialState: {
        onlineUsers: [],
        messages: [], // Ensure this is an array
    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload); // This action should append new messages
        },
    }
});

export const { setOnlineUsers, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
