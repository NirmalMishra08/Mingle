import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 my-8 flex flex-col  pl-[20%] absolute right-[500px]'>
        <Posts/>
    </div>
  )
}

export default Feed