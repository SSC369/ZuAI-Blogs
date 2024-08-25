import { IoMdMail } from "react-icons/io";
import { RiLock2Line } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, username } = formData;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", {
        duration: 1000,
      });
      return false;
    } else if (password.length < 5) {
      toast.error("Password is too short.", { duration: 1000 });
      return false;
    } else if (email === "") {
      toast.error("Email is required!", { duration: 1000 });
      return false;
    } else if (username === "") {
      toast.error("Username is required!", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;
    try {
      setLoading(true);
      if (handleValidation()) {
        const url = import.meta.env.VITE_BACKEND_URL + "/auth/register";

        const response = await axios.post(url, {
          password,
          email,
          username,
        });

        const { data } = response;

        if (response.status === 201) {
          Cookies.set("zuAiCookie", data.jwtToken);
          setFormData({
            password: "",
            email: "",
            username: "",
            confirmPassword: "",
          });
          toast.success("Registration Successful", {
            duration: 1000,
          });

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white min-w-[300px] min-h-dvh">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-white p-8 w-4/5 max-w-md min-w-[300px] rounded-2xl text-sm shadow-2xl"
      >
        <h1 className="text-black font-bold text-2xl md:text-3xl mb-3">
          ZuAI <span className="text-purple-800">Register</span>
        </h1>

        <label className="text-black font-semibold">Username</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <FaRegCircleUser className="mr-2" size={20} />
          <input
            onChange={handleChange}
            name="username"
            value={formData.username}
            type="text"
            className="ml-2 border-none h-full focus:outline-none w-[80%]"
            placeholder="Enter username"
          />
        </div>

        <label className="text-black font-semibold">Email</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <IoMdMail className="mr-2" size={20} />
          <input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="text"
            className="ml-2 border-none h-full focus:outline-none w-[80%]"
            placeholder="Enter your Email"
          />
        </div>

        <label className="text-black font-semibold">Password</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input
            onChange={handleChange}
            value={formData.password}
            name="password"
            type={showPassword ? "text" : "password"}
            className="ml-2 border-none w-full h-full focus:outline-none"
            placeholder="Enter your Password"
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          ) : (
            <AiOutlineEye
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          )}
        </div>

        <label className="text-black font-semibold">Confirm Password</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="ml-2 border-none w-full h-full focus:outline-none"
            placeholder="Enter your Password"
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          ) : (
            <AiOutlineEye
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          )}
        </div>

        <button
          type="submit"
          className="flex justify-center items-center mt-5 mb-2 bg-purple-800 text-white font-medium text-sm rounded-lg h-12 w-full transition hover:bg-purple-600"
        >
          {loading ? (
            <TailSpin
              visible={true}
              height="30"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Submit"
          )}
        </button>
        <p className="text-center text-black text-sm">
          Already have an account?
          <span
            className="text-purple-800 cursor-pointer font-medium ml-2"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
