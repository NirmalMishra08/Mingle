import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';

import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import Messages from './Messages';
import { useState } from 'react';
import axios from 'axios';
import { setMessages ,addMessage} from '@/redux/chatSlice';
import { useEffect } from'react';

const Chatpage = () => {
  const [textMessage,setTextMessage]= useState("")
  const { user, suggestedUser, selectedUser } = useSelector(store => store.auth);
  const {onlineUsers,messages} = useSelector(store=>store.chat)
 
 
  const dispatch = useDispatch()

  const sendMessageHandler = async(receiverId)=>{
    console.log("sendMessageHandler",receiverId)


    try {
      const res = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`,{textMessage},{
         headers:{
           'Content-Type': 'application/json'
         },
         withCredentials: true,
      });
      console.log(res);
      if(res.data.success){
        console.log("Received new message:", res.data.data);

        const updatedMessages = Array.isArray(messages) ? [...messages, res.data.data] : [res.data.data];

        dispatch(setMessages(updatedMessages));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {
  
return () => {
    dispatch(setSelectedUser(null))
  }
}, [dispatch])

  return (
    <div className='flex ml-[18.5%] h-screen'>
      <section className='w-full md:w-1/4 my-8'>
        <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
        <hr className='mb-4 border-gray-400' />
        <div className='overflow-y-auto h-[80vh]'>

          {
            suggestedUser.map((suggestedUsers) => {
              const isOnline = onlineUsers.includes(suggestedUsers._id);
              return (
                <div  key={suggestedUsers._id}  onClick={() => dispatch(setSelectedUser(suggestedUsers))} className='flex items-center gap-3 p-3 hover:bg-gray-50  cursor-pointer'>
                  <Avatar className='w-14 h-14'>
                    <AvatarImage src={suggestedUsers?.profilePicture} alt='post_image' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col'>
                    <span className='font-medium'>{suggestedUsers?.username}</span>
                    <span className={`text-sm ${isOnline ? 'text-green-500 ' : 'text-red-600'}`}>{isOnline ? 'online' : 'offline'}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      {
        selectedUser ? (
          <section className='flex-1 border-l  border-l-gray-300 flex flex-col h-full'>
            <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 z-10 bg-white'>
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} alt='post_image' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span>
                  {selectedUser?.username}
                </span>
              </div>
            </div>
            <Messages selectedUser={selectedUser}/>
            <div className='flex items-center p-4 border-t border-t-gray-300'>
              <input value={textMessage}  onChange={(e)=>{setTextMessage(e.target.value)}} type="text" className='flex-1 mr-2 focus-visible:ring-transparent border p-1 rounded-md' placeholder='Messages...' />
              <Button onClick={()=> sendMessageHandler(selectedUser?._id)}>Send</Button>
            </div>
          </section>
        ) : (
          <div className='flex flex-col items-center justify-center mx-auto'>
            <MessageCircle className='w-32 h-32 my-4 ' />
            <h1>Your messages</h1>
            <span>Send a message to start the chat.</span>
          </div>
        )
          
      }
    </div>
  );
};

export default Chatpage;
