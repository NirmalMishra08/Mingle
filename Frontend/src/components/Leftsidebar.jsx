import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postslice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'


const Leftsidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const { likeNotification } = useSelector(store => store.realTimeNotification)
    const { messages } = useSelector(store => store.chat)

    const [open, setOpen] = useState(false)


    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(null))
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]))
                navigate('/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const sidebarHandler = (text) => {
       
        if (text === 'Logout') {
            logoutHandler()
        } else if (text === 'Create') {
            setOpen(true);
        }
        else if (text === 'Profile') {
            navigate(`/profile/${user?._id}`)
        }
        else if (text === "Home") {
            navigate("/")
        }
        else if(text === "Messages"){
            navigate('/chat')
        }
    }
    const sidebarItems = [

        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },



    ]
    return (
        <>
            <div className='fixed top-0 z-10 left-8 px-4 border-r  border-gray-300 w-[16%] h-screen '>
                <div className='flex flex-col '>
                    <img className=' h-24 w-[150px] p-0 m-0aspect-[1/1] object-cover flex items-center' src="logo.png" alt="error" />
                    <div className=''>
                        {
                            sidebarItems.map((item, index) => {
                                return (
                                    <div onClick={() => sidebarHandler(item.text)} className='flex  items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 m-3' key={index}>
                                        {item.icon}
                                        <span>{item.text}</span>
                                        {
                                            
                                        item.text === "Notifications" && likeNotification.length > 0 && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div>
                                                        {
                                                            likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                                likeNotification.map((notification) => {
                                                                    return (
                                                                        <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                                                            <Avatar>
                                                                                <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                                <AvatarFallback>CN</AvatarFallback>
                                                                            </Avatar>
                                                                            <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )
                                    }
                                    
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <CreatePost open={open} setOpen={setOpen} />

            </div>
        </>
    )
}

export default Leftsidebar