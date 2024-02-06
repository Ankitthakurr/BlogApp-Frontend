import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/blog/blogSlice";

const Navbar = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.blogs);
  
  

  return (
    <div className="bg-black text-white py-2 sticky z-10 top-0">
      <div className="flex justify-between w-[95%] m-auto">
        <Link to="/" className="font-bold text-xl">
          BLOG APP
        </Link>
        <span className="flex gap-2 justify-between">
          {!user ? (
            <>
              {" "}
              <Link
                to="/login"
                className="bg-gray-500 px-4 rounded cursor-pointer hover:bg-gray-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-500 px-4 rounded cursor-pointer hover:bg-gray-600"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              // to="/login"
              onClick={()=>dispatch(logout())}
              className="bg-gray-500 px-4 rounded cursor-pointer hover:bg-gray-600"
            >
              Logout
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
