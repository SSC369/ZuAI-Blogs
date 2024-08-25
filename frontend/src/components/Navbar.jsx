import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaUserEdit } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { LuPower } from "react-icons/lu";
import { HiCollection } from "react-icons/hi";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.slice(1);
  const jwtToken = Cookies.get("zuAiCookie");

  const handleLogout = () => {
    Cookies.remove("zuAiCookie");
    toast.success("Signed out successfully", { duration: 1000 });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-5 py-4  bg-white h-[70px] min-w-[300px] md:px-10">
      <div
        onClick={() => navigate("/")}
        className="flex gap-2 items-center cursor-pointer"
      >
        <p className="text-black text-xl font-semibold md:text-xl">
          ZuAI <span className="text-purple-800">Blogs</span>
        </p>
      </div>

      <div className="relative">
        <CgProfile
          onClick={() => setMenu(!menu)}
          className="text-black text-2xl cursor-pointer md:text-3xl"
        />
        {menu && (
          <ul className="absolute right-1 top-[60px] flex flex-col gap-2 bg-white text-black p-3 shadow-lg rounded-md w-[160px] z-50">
            <li
              className={`flex items-center gap-3 pb-1 cursor-pointer `}
              onClick={() => navigate(`/blogs`)}
            >
              <HiCollection className="text-lg md:text-xl" />
              <p className="text-sm md:text-base">My Blogs</p>
            </li>

            <li
              className={`flex items-center gap-3 pb-1 cursor-pointer `}
              onClick={() => navigate(`/create-blog`)}
            >
              <IoAddCircle className="text-lg md:text-xl text-purple-800" />
              <p className="text-sm md:text-base">Create blog</p>
            </li>

            <li className="flex items-center gap-3 cursor-pointer">
              {jwtToken ? (
                <>
                  <CiLogin className="text-lg md:text-xl" />
                  <p onClick={handleLogout} className="text-sm md:text-base">
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <LuPower className="text-lg md:text-xl" />
                  <p onClick={handleLogin} className="text-sm md:text-base">
                    Login
                  </p>
                </>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
