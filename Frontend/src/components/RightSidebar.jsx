import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SuggestedUser from './SuggestedUser'

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth)
  return (
    <div className='w-fit my-8 mx-16 px-12 pt-5 '>
      <div className='flex items-center gap-2'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt='post_image' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div >
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className='text-gray-500 text-sm'>{user?.bio || " bio here ..."}</span>
        </div>
      </div>

      <SuggestedUser />
    </div>
  )
}

export default RightSidebar