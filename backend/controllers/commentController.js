const Comment = require("../models/commentModel");
const User = require("../models/userModel");

module.exports.addComment = async (req, res) => {
  try {
    const { comment, date, blogId } = req.body;
    const { userId } = req.user;
    await Comment.create({
      blogId,
      comment,
      date,
      userId,
    });

    res.status(201).json({ msg: "Comment Added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.editComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;

    await Comment.findByIdAndUpdate(id, {
      $set: {
        comment,
        date: new Date(),
      },
    });
    res.status(200).json({ msg: "Comment Edited" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ msg: "Comment deleted!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const data = await Comment.find({ blogId });

    const comments = await Promise.all(
      data.map(async (comment) => {
        const { username, profileImage, _id } = await User.findById(
          comment.userId
        );
        return {
          ...comment._doc,
          username,
          profileImage,
          userId: _id,
        };
      })
    );

    return res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
