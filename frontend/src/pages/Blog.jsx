import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { FaRegEdit } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { FiUser } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import empty from "../assets/no-review.jpg";

const Blog = () => {
  const [reviewsModal, setReviewsModal] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const zuAiCookie = Cookies.get("zuAiCookie");
  const navigate = useNavigate();
  const { userId } = jwtDecode(zuAiCookie);

  // fetching blog data
  const fetcher = async (url) => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        return res.data.blog;
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    }
  };

  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,
    fetcher
  );

  //comment fetching
  const commentsFetcher = async (url) => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        return res.data.comments;
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    }
  };

  const {
    data: comments,
    isLoading: commentsLoading,
    mutate,
  } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/comments/${id}`,
    commentsFetcher
  );

  const handleComment = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/comments`;
      const res = await axios.post(
        url,
        {
          blogId: id,
          comment,
          date: new Date(),
        },
        {
          headers: {
            Authorization: zuAiCookie,
          },
        }
      );

      if (res.status === 201) {
        toast.success(res.data.msg, { duration: 1000 });
        mutate();
        setComment("");
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    }
  };

  //comment delete
  const handleCommentDelete = async (id) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/comments/${id}`;
      const res = await axios.delete(url);
      if (res.status === 200) {
        mutate();
        toast.success(res.data.msg, { duration: 1000 });
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    }
  };

  const renderEmptyView = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <img className="h-[200px]" src={empty} />
        <p className="font-semibold text-lg  md:text-xl">No Comment's</p>
      </div>
    );
  };

  const handleDeleteBlog = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL + "/posts/" + id;
      const res = await axios.delete(url);
      if (res.status === 200) {
        toast.success(res.data?.msg, { duration: 1000 });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    }
  };

  return (
    <div className="min-h-[calc(100dvh-70px)] min-w-[300px]  p-4 flex flex-col bg-slate-200">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-[20px] md:flex-row md:items-start md:justify-center md:gap-[10px]">
          {data?.imageUrl && (
            <div className="w-[80%] flex justify-center items-center md:w-fit">
              <img className="w-80% md:h-[300px]" src={data?.imageUrl} />
            </div>
          )}

          <div className="p-3 flex flex-col w-[80%] min-h-[200px]  md:w-[50%] bg-white rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold">{data?.title}</h2>

            <div className="my-3 flex items-center gap-2 rounded-lg  text-sm">
              <p className="text-slate-600">Published By:</p>

              <div className="flex items-center gap-2 bg-slate-100 rounded-xl pr-2">
                <div className="w-[24px] h-[24px] rounded-full flex justify-center items-center bg-purple-800">
                  <FiUser className="text-white" />
                </div>
                <p className="text-sm">{data?.username}</p>
              </div>
            </div>

            <div className="text-sm flex items-center gap-2 mb-2">
              <p className="text-slate-600">Published Date:</p>
              <p className="">{dayjs(data?.date).format("MMM D, YYYY")}</p>
            </div>

            <div className="cursor-pointer flex justify-between items-center text-lg my-2 max-w-[300px]">
              {data?.userId === userId && (
                <div className="flex items-center gap-2 text-sm">
                  <p className="text-slate-600">Edit</p>
                  <FaRegEdit
                    onClick={() => navigate("/edit/blog/" + id)}
                    className="hover:text-purple-800 hover:text-xl"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <p className="text-slate-600">Comments</p>
                <FaRegComment
                  onClick={() => setReviewsModal(true)}
                  className="hover:text-purple-800 hover:text-xl"
                />
              </div>
              {data?.userId === userId && (
                <div className="flex items-center gap-2 text-sm">
                  <p className="text-slate-600">Delete</p>
                  <AiOutlineDelete
                    onClick={handleDeleteBlog}
                    className="hover:text-purple-800 hover:text-xl"
                  />
                </div>
              )}
            </div>

            <p
              onClick={() => setReviewsModal(true)}
              className="text-sm my-1 font-medium text-text3 cursor-pointer"
            >
              View all
              <span className="text-purple-800 font-semibold text-lg mx-2">
                {comments?.length}
              </span>
              comments
            </p>

            <p className="break-words bg-slate-100 rounded-lg p-2 text-sm mt-[4px] mb-[8px]">
              {data?.description}
            </p>
          </div>
        </div>
      )}

      {reviewsModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex justify-center items-end pb-3">
          <div className="relative bg-white rounded-xl max-w-[800px] w-full h-[60vh] flex flex-col p-4">
            <div
              className="absolute right-[10px] top-[10px] cursor-pointer text-xl text-purple-800"
              onClick={() => setReviewsModal(false)}
            >
              <RxCross2 />
            </div>
            <h2 className="font-semibold text-xl text-center mb-4">Comments</h2>

            <div className="flex items-center mt-[10px] gap-[10px]">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment"
                className="border bg-slate-100 border-slate-200 rounded-lg flex p-2 text-sm flex-1 outline-none"
              />
              <button
                style={
                  comment.length === 0
                    ? { opacity: "0.5", pointerEvents: "none" }
                    : {}
                }
                onClick={handleComment}
                className="bg-purple-800 text-white rounded-lg  p-2 text-sm"
              >
                Send
              </button>
            </div>
            {commentsLoading ? (
              <Loader />
            ) : (
              <>
                {comments?.length === 0 ? (
                  renderEmptyView()
                ) : (
                  <ul className="flex flex-col p-0 list-none mt-2 overflow-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-gray-100">
                    {comments?.map((c, index) => {
                      const { username, comment, date, _id } = c;
                      return (
                        <li key={_id} className="flex gap-2 items-start p-2 ">
                          <div className="w-[34px] h-[30px] rounded-full flex justify-center items-center bg-purple-800 mt-1">
                            <FiUser className="text-white" />
                          </div>
                          <div className="flex w-full justify-between border-b-2 border-b-slate-100 pb-2">
                            <div className="flex flex-col gap-0.5 ">
                              <div className="text-slate-600  flex items-center gap-1">
                                <p className="text-sm">{username}</p>
                                <BsDot />
                                <p className="text-xs">
                                  {moment(date).fromNow()}
                                </p>
                              </div>

                              <p className="text-sm">{comment}</p>
                            </div>

                            {c.userId === userId && (
                              <AiOutlineDelete
                                className="cursor-pointer hover:text-purple-800 text-lg"
                                onClick={() => handleCommentDelete(_id)}
                              />
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
