const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

module.exports.createBlog = async (req, res) => {
  try {
    const { imageUrl, date, title, description } = req.body;
    const { userId } = req.user;

    await Blog.create({
      imageUrl,
      date,
      title,
      userId,
      description,
    });

    res.status(201).json({ msg: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.fetchBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    const { profileImage, username } = await User.findById(blog.userId);

    return res.status(200).json({
      blog: {
        ...blog._doc,
        username,
        profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.userBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    const { userId } = req.user;
    const blogs = await Blog.find({ userId });

    const filteredBlogs = blogs?.filter((b) =>
      b.title.toLowerCase().includes(query?.toLowerCase())
    );
    res.status(200).json({ blogs: filteredBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.deleteOne({ _id: id });
    await Comment.deleteMany({ blogId: id });

    res.status(200).json({ msg: "Blog Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, description } = req.body;

    await Blog.findByIdAndUpdate(id, {
      $set: {
        imageUrl,
        title,
        description,
        lastUpdated: new Date(),
      },
    });
    return res.status(200).json({ msg: "Blog updated" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};

// search query of an image
module.exports.searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;

    const blogs = await Blog.find();

    const filteredBlogs = blogs?.filter((b) =>
      b.title.toLowerCase().includes(query?.toLowerCase())
    );
    res.status(200).json({ blogs: filteredBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
