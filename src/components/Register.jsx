import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate()
  const {user ,isSuccess,message,isError,isLoading} = useSelector((state)=>state.blogs)
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = input;
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password Not Match");
    } else {
      dispatch(registerUser(input));
      setInput({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  useEffect(()=>{
    if(user && isSuccess){
      nevigate("/")
    }
  },[user])

  if(isLoading){
    return(
      <h1 className="text-4xl text-center font-bold mt-5">Loading...</h1>
    )
  }

  return (
    <div className="flex justify-center items-center h-[500px] ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-[500px] max-md:w-[80%] h-[400px]  gap-2 innerDiv "
      >
        <h1 className="font-bold text-2xl mb-4">REGISTER</h1>
        <input
        required
          value={name}
          name="name"
          onChange={handleChange}
          className="w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl"
          type="text"
          placeholder="Enter your name "
        />
        <input
        required
          value={email}
          name="email"
          onChange={handleChange}
          className="w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl"
          type="email"
          placeholder="Enter your email"
        />
        <input
        required
          value={password}
          name="password"
          onChange={handleChange}
          className="w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl"
          type="password"
          placeholder="Enter your password"
        />
        <input
        required
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          className="w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl"
          type="password"
          placeholder="Confirm password"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white text-lg w-[80%] rounded-2xl py-[2px] hover:bg-black"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
