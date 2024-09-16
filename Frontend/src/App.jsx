import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from './components/Mainlayout'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Chatpage from './components/Chatpage'
import EditProfile from './components/EditProfile'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice.js'
import { setLikeNotification } from './redux/RTNSlice'
import ProtectedRoutes from './components/ProtectedRoutes'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><Mainlayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><Chatpage/></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },


])

function App() {
  const { user } = useSelector(store => store.auth)
  const { socket }= useSelector(store=>store.socketio)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        
      });
      dispatch(setSocket(socketio));
      //listen to all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socketio.on('notification',(notification)=>{
        dispatch(setLikeNotification(notification));
      })
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    }
    else if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user,dispatch])

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
