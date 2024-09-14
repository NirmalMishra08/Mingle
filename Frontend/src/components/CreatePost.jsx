import React, { useRef } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '@/redux/postslice'





function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
}

const CreatePost = ({ open, setOpen }) => {
    const imageref = useRef();
    const [file, setFile] = useState('')
    const [caption, setcaption] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { posts } = useSelector(store => store.post)
    const { user } = useSelector(store => store.auth)


    const filechangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl)
        }
    }
    const createPostHandler = async (e) => {

        const formData = new FormData();
        formData.append('caption', caption);
        if (imagePreview) {
            formData.append('image', file)
        }

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts])) //spread operator
                toast.success(res.data.message)
            }

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Dialog open={open}>

                <DialogContent onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
                    <div className='flex gap-3 items-center' >
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} alt='img_jpg' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-semibold text-xs'>{user?.username}</h1>
                            <span className='text-gray-600 text-xs'>Bio Here...</span>
                        </div>
                    </div>
                    <Textarea value={caption} onChange={(e) => setcaption(e.target.value)} className='focus-visible:ring-transparent border-none ' placeholder='Write a caption...' />
                    {
                        imagePreview && (
                            <div className='w-full h-64 flex items-center justify-center'>
                                <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
                            </div>
                        )
                    }
                    <input ref={imageref} type="file" className='hidden' onChange={filechangeHandler} />
                    <Button onClick={() => imageref.current.click()} className='w-fit mx-auto bg-[#0095f6] hover:bg-[#258bcf]'>Select From Computer</Button>
                    {
                        imagePreview && (
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                                </Button>
                            ) : (<Button onClick={createPostHandler} type='submit' className='w-full'>Post</Button>)
                        )
                    }

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePost