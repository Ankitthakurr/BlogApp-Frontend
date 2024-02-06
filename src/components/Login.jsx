import React, { useEffect, useState } from 'react'
import { loginUser, timeout } from '../features/blog/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const {isSuccess , isLoading,user,message,isError} = useSelector(state=>state.blogs)
  const [data,setData] = useState({
    email : "",
    password : "",
  })
  
  const {email,password} = data
  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(loginUser(data))
    setData({
      email : "",
      password : "",
    }
    )
  }

  useEffect(()=>{
    if(user && isSuccess){
        nevigate("/")
    }
    if(isError && message){
      toast.error(message)
      setTimeout(()=>{
        dispatch(timeout())
      },1000)
    }
  },[user,isSuccess,message,isError])

  if(isLoading){
    return(
      <h1 className="text-4xl text-center font-bold mt-5">Loading...</h1>
    )
  }


  return (
    <div className='flex justify-center items-center h-[500px] '>
    <form onSubmit={handleSubmit} action="submit" className='flex flex-col justify-center items-center w-[500px] max-md:w-[80%] h-[400px]  gap-2 innerDiv ' >
    <h1 className='font-bold text-2xl mb-4'>LOGIN</h1>
     <input required onChange={handleChange} value={email} name='email' className='w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl' type="email" placeholder='Enter your email' />
     <input required onChange={handleChange} value={password} name='password' className='w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl' type="password" placeholder='Enter your password' />
     <button type='submit' className='bg-slate-700 text-white text-lg w-[80%] rounded-2xl py-[2px] hover:bg-black'>Login</button>
    </form>
   </div>
  )
}

export default Login
