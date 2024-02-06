import axios from "axios";

const register = async (data) => {
  const res = await axios.post("https://blog-app-uhap.onrender.com/user/signup", data);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (data) => {
  const res = await axios.post("https://blog-app-uhap.onrender.com/user/signin", data);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};
const getBlogData = async (data) => {
  const res = await axios.get(`https://blog-app-uhap.onrender.com/blog/${data}`);
  return res.data;
};

const createBlogData = async (data) => {
  const { userId, tittle, description } = data;
  const res = await axios.post(`https://blog-app-uhap.onrender.com/blog/${userId}`, {
    tittle,
    description,
  });
  return res.data;
};
const deleteBlogData = async (data) => {
  const res = await axios.delete(`https://blog-app-uhap.onrender.com/blog/${data}`);
  return res.data;
};

const editBlogData = async (data) => {
  const { userId, tittle, description } = data;
  const res = await axios.put(`https://blog-app-uhap.onrender.com/blog/${userId}`, {
    tittle,
    description,
  });
  return res.data;
};

const blogService = {
  register,
  login,
  getBlogData,
  createBlogData,
  deleteBlogData,
  editBlogData,
};
export default blogService;
