import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBlogData,
  deleteBlogData,
  getBlogData,
  timeout,
  index,
  editBlogData,
  edit
} from "../features/blog/blogSlice";
import { toast } from "react-toastify";

const Blogs = ({ item }) => {
  const dispatch = useDispatch();
 

  return (
    <div className="flex max-sm:w-[97%] max-md:w-[95%] max-lg:w-[80%] w-[60%] p-5 flex-col justify-center innerDiv ">
      <h1 className="font-bold">{item.tittle}</h1>
      <h1 className="text-wrap overflow-hidden">{item.description}</h1>
      <span className="text-end ">
        <button onClick={()=>dispatch(edit(item))} className="bg-slate-700 text-white max-[500px]:text-sm text-lg w-[15%] me-1 rounded py-[2px] hover:bg-black">
          Edit
        </button>
        <button
          onClick={() => dispatch(deleteBlogData(item._id))}
          className="bg-slate-700 text-white max-[500px]:text-sm text-lg w-[15%] rounded py-[2px] hover:bg-black"
        >
          Delete
        </button>
      </span>
    </div>
  );
};

const AllUsers = ({ item }) => {
  const dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(getBlogData(item._id));
    dispatch(index(item._id))
  };
  return (
    <div className="innerDiv w-[50%] min-h-[130px] flex flex-col justify-center items-center ">
      <h1 className="font-bold text-xl">{item.name}</h1>
      <button
        onClick={handleCheck}
        className="bg-slate-700 w-[50%] text-white max-[500px]:text-sm text-lg rounded py-[2px] hover:bg-black"
      >
        Check
      </button>
    </div>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { Edit, user, blogData, isError, message, messageDeleted,index } =
    useSelector((state) => state.blogs);
  const [formData, setFormData] = useState({
    tittle: "",
    description: "",
  });


  const { tittle, description } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Edit.isEdit){
      dispatch(editBlogData({
        tittle,description,userId : Edit.obj._id
      }))
      edit.isEdit = false
    }else{
      dispatch(createBlogData({ userId: index ? index : user.id, tittle, description }));
    }
   
    setFormData({
      tittle: "",
      description: "",
    });
   
  };

  useEffect(() => {
    if(Edit.isEdit){
      setFormData({
        tittle: Edit.obj.tittle,
        description: Edit.obj.description,
      })
    }
    if (!blogData && user && !user.userData) {
      dispatch(getBlogData(user.id));
    }
    if (!user) {
      nevigate("/login");
    }
  }, [user,Edit]);
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      setTimeout(() => {
        dispatch(timeout());
      }, 1000);
    }
    if (messageDeleted.message) {
      toast.error(messageDeleted.message);
      setTimeout(() => {
        dispatch(timeout());
      }, 1000);
    }
  }, [isError, message, messageDeleted.message, blogData]);

  if (user && user.userData && !blogData) {
    return (
      <div className="flex justify-center items-center flex-col gap-3 pt-5">
        {user.userData.map((item, i) => (
          <AllUsers key={i} item={item} />
        ))}
      </div>
    );
  }

  if (blogData) {
    return (
      <div>
        <div className="flex justify-center items-center h-[300px] ">
          <form
            onSubmit={(e) => handleSubmit(e)}
            action="submit"
            className="flex flex-col justify-center items-center w-[600px] max-md:w-[80%] h-[220px]  gap-2 innerDiv "
          >
            <h1 className="font-bold text-2xl mb-4">BLOGS</h1>
            <input
              required
              onChange={(e) => handleChange(e)}
              value={tittle}
              name="tittle"
              className="w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl"
              type="text"
              placeholder="Enter  title"
            />
            <input
              required
              onChange={(e) => handleChange(e)}
              value={description}
              name="description"
              className="w-[80%] outline-none p-1 px-5 hover:bg-slate-300 hover:rounded-2xl"
              type="text"
              placeholder="Enter  description"
            />
            <button
              type="submit"
              className="bg-slate-700 text-white text-lg w-[80%] rounded-2xl py-[2px] hover:bg-black"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex justify-center  items-center flex-col gap-2  ">
          {blogData.map((item, i) => (
            <Blogs key={i} item={item} />
          ))}
        </div>
      </div>
    );
  }
};

export default HomePage;
