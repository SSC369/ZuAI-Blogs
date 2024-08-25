import React, { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import emp1 from "../assets/emp1.jpg";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import debounce from "lodash/debounce";

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [blogInput, setBlogInput] = useState("");

  const renderEmptyView = () => {
    return (
      <div className="flex flex-col items-center self-center bg-white h-fit my-auto p-4 rounded-xl shadow-xl">
        <img src={emp1} className="h-[200px]" />
        <h1>Currently there are no blog's</h1>
      </div>
    );
  };

  const fetchBlogs = async () => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + `/posts?query=${blogInput}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        setBlogs(res.data?.blogs);
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    } finally {
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBlogs();
    setLoading(false);
  }, []);

  const debouncedFetchBlogs = useCallback(debounce(fetchBlogs, 500), [
    blogInput,
  ]);

  useEffect(() => {
    if (blogInput) {
      debouncedFetchBlogs();
    }
    return () => {
      debouncedFetchBlogs.cancel();
    };
  }, [blogInput]);

  return (
    <div
      style={{ minHeight: "calc(100dvh - 70px)" }}
      className="bg-slate-200 flex flex-col min-w-[300px] py-4"
    >
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center self-center items-center my-5 w-[80%] max-w-[600px]">
            <input
              value={blogInput}
              onChange={(e) => setBlogInput(e.target.value)}
              placeholder="Search for a blog"
              type="text"
              className="bg-slate-100 h-[40px] rounded-l-lg pl-3 outline-none cursor-pointer w-[80%] max-w-[400px]"
            />
            <button
              onClick={fetchBlogs}
              style={
                blogInput === ""
                  ? { opacity: "0.5", pointerEvents: "none" }
                  : {}
              }
              className="bg-purple-800 h-[40px] text-white px-3 rounded-r-lg flex items-center justify-center"
            >
              <CgSearch fontSize={24} />
            </button>
          </div>
          {blogs?.length === 0 ? (
            renderEmptyView()
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-center mb-3">Blogs</h1>
              <ul className="pl-0 flex flex-col gap-4 list-none w-[80%] self-center md:flex-row md:flex-wrap md:justify-center mt-4">
                {blogs?.map((b) => {
                  const { _id, title, description, imageUrl } = b;
                  return (
                    <li
                      onClick={() => navigate("/blog/" + _id)}
                      className="bg-white min-w-[200px] rounded-lg p-3 flex flex-col  gap-2 lg:w-[40%] max-w-[600px]  cursor-pointer"
                      key={b._id}
                    >
                      <p className="font-semibold text-lg md:text-xl text-center">
                        {title}
                      </p>

                      {imageUrl && (
                        <div className="self-center">
                          <img
                            src={imageUrl}
                            className="h-[200px] rounded-xl"
                          />
                        </div>
                      )}

                      <p className="text-slate-600  px-3 mt-3 rounded-md line-clamp">
                        {description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
