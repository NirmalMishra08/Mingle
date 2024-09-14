import React, { useEffect, useState } from 'react'
import { Dialog, DialogTrigger } from './ui/dialog'
import { DialogContent } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { DivideCircle, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

import Comment from './comment'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts } from '@/redux/postslice'



const CommentDialog = ({ open, setOpen }) => {
    const [text, settext] = useState('')
    const { selectedPost, posts } = useSelector(store => store.post)
    const [comment, setComment] = useState([])

    const dispatch = useDispatch();

    useEffect(()=>{
        if(selectedPost){
            setComment(selectedPost.comments)
        }
    },[selectedPost])


    const changeEventHandler = (e) => {
        const inputtext = e.target.value;
        if (inputtext.trim()) {
            settext(inputtext);

        } else {
            settext('')
        }

    }
const sentMessageHandler = async () => {
    try {
        const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,
            { text }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });

        if (res.data.success) {
            const updatedCommentData = [...comment, res.data.comment];
            setComment(updatedCommentData);

            const updatedPostData = posts.map(p =>
                p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
            );
            dispatch(setPosts(updatedPostData));

            toast.success(res.data.message);
            settext('');
        }
    } catch (error) {
        console.log(error);
    }
};

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-5xl p-0 m-0 flex flex-col'>
                <div className='flex '>
                    <div className='w-1/2'>
                        <img
                            src={selectedPost?.image}
                            alt="post_img"
                            className='w-full h-full aspect-1 object-cover  rounded-l-lg max-w-full max-h-[500px]'
                        />
                    </div>

                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex gap-3 '>

                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.author?.profilePicture} />
                                        <AvatarFallback className=''>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-light text-xl fixed top-5 '>{selectedPost?.author?.username}</Link>
                                    {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='fixed right-12 top-4 cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className='flex flex-col items-center text-center text-sm'>
                                    <div className='cursor-pointer w-full text-[#ed4956] font-bold'>Unfollow</div>
                                    <div className='w-full h-[1px] bg-gray-400'></div>
                                    <div className='cursor-pointer w-full  font-bold hover:text-gray-600'>Add to Favorite</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {
                                selectedPost?.comments.map((comment) => <Comment key={comment._id} comment={comment} />)
                            }
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2' >
                                <input type='text' value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2 rounded' />
                                <Button disabled={!text.trim()} onClick={sentMessageHandler} variant='outline'>Send</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog