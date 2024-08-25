const router = require("express").Router();

const {
  createBlog,
  deleteBlog,
  editBlog,
  fetchBlog,
  searchBlogs,
  userBlogs,
  getBlogs,
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/posts", searchBlogs);
router.get("/posts/:id", fetchBlog);

router.post("/posts", authMiddleware, createBlog);
router.put("/posts/:id", editBlog);

router.get("/user/posts", authMiddleware, userBlogs);

router.delete("/posts/:id", deleteBlog);

module.exports = router;
