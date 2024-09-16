import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'




const Signup = () => {
    const [input, setinput] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth)
    const handleInputChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input)

        try {
            setloading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {

                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
                setinput({
                    username: '',
                    email: '',
                    password: ''
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setloading(false);
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [])
    return (
        <div>
            <div className='flex items-center w-screen h-screen justify-center '>
                <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                    <div className='my-4 flex flex-col items-center justify-center'>
                        <img src="logo.png" className='w-32' alt="" />
                        <p>Signup to see photos</p>
                    </div>
                    <div className='flex flex-col '>
                        <span className=' font-medium '>Username</span>
                        <input onChange={handleInputChange} name='username' value={input.username} type='text' className='focus-visible:ring-transparent border rounded-md my-2  h-8' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='py-1 font-medium'>Email</span>
                        <input onChange={handleInputChange} name='email' value={input.email} type='text' className='focus-visible:ring-transparent border rounded-md  my-2 h-8' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='py-1 font-medium'>Password</span>
                        <input onChange={handleInputChange} name='password' value={input.password} type='password' className='focus-visible:ring-transparent border rounded-md  my-2 w-[300px]  h-8' />
                    </div>
                    {
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            </Button>
                        ) : (
                            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full ">SignUp</button>
                        )
                    }

                    <span>Already Have an account ? <Link to='/login' className='text-blue-600'>Login</Link></span>


                </form>
            </div>
        </div>
    )
}

export default Signup