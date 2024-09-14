import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const SuggestedUser = () => {
    const { suggestedUser } = useSelector(store => store.auth)
    return (
        <div className='my-10 flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-4 text-sm'>
                <h1 className='font-semibold text-gray-500'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See all</span>
            </div>
            {
                suggestedUser.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-3'>
                                <Link to={`/profile/${user._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt='post_image' />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div >
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?.id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-500 text-sm'>{user?._bio || " bio here ..."}</span>
                                </div>
                            </div>
                            <span className='text-blue-500 font-semibold text-sm'>Follow</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUser