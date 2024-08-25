import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { FcAddImage } from "react-icons/fc";
import { AiOutlineDelete } from "react-icons/ai";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const CreateBlog = () => {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadFile = () => {
    const storage = getStorage(app);
    const name = new Date() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            setImageLoading(true);
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFile("");
          setImageLoading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const submitCondition =
    postData.title.length > 0 && postData.description.length > 0;

  const handlePostValidation = () => {
    const { title, description } = postData;
    if (title.length === 0 || description.length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { title, description } = postData;

      const zuAiCookie = Cookies.get("zuAiCookie");
      const url = `${import.meta.env.VITE_BACKEND_URL}/posts`;
      if (handlePostValidation()) {
        const response = await axios.post(
          url,
          {
            title,
            description,
            date: new Date(),
            imageUrl,
          },
          {
            headers: {
              Authorization: zuAiCookie,
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.msg, { duration: 1000 });
          setImageUrl("");
          setFile("");
          setPostData({
            title: "",
            description: "",
          });
          navigate("/blogs");
        }
      } else {
        toast.error("Invalid Details", { duration: 1000 });
      }
    } catch (error) {
      toast.error(error.response.data.msg, { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ minHeight: "calc(100dvh - 70px)" }}
      className="min-w-[300px] py-4 bg-slate-200"
    >
      <h1 className="text-center textt-xl md:text-3xl font-semibold mb-5">
        Create Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 md:flex-row md:flex-wrap md:justify-center md:items-start  w-[80%] m-auto"
      >
        {!imageUrl && (
          <div className="h-[200px] md:h-[300px] w-[80%] max-w-[400px] md:w-2/5 border-2 border-dashed border-gray-500 bg-cream flex flex-col items-center justify-center rounded-lg">
            <label htmlFor="add" className="cursor-pointer">
              <FcAddImage className="text-[30px]" />
            </label>
            <p className="font-medium text-xs text-slate-500 mt-1">Add Image</p>
          </div>
        )}
        <input
          id="add"
          className="hidden"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {imageUrl && (
          <div className="rounded-lg relative flex flex-col gap-3">
            <img
              className="rounded-lg h-[300px]"
              src={imageUrl}
              alt="uploaded"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 bg-purple-800 p-2 rounded-full"
            >
              <AiOutlineDelete className="text-xl text-white" />
            </button>
          </div>
        )}

        <div className="w-[100%] md:grow max-w-[600px] flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              value={postData.title}
              id="title"
              type="text"
              className="p-3 rounded-lg bg-white text-gray-700 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-gray-700 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              value={postData.description}
              rows={6}
              id="description"
              className="p-3 rounded-lg bg-white text-gray-700 outline-none resize-none"
            />
          </div>

          <button
            style={
              !submitCondition ? { opacity: "0.5", pointerEvents: "none" } : {}
            }
            type="submit"
            className="flex justify-center items-center mt-5  bg-purple-800 text-white font-medium text-sm rounded-lg h-10 w-[100px] transition hover:bg-purple-600"
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
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
