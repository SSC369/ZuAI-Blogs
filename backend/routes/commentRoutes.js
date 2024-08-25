const router = require("express").Router();

const {
  addComment,
  editComment,
  deleteComment,
  getComments,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/comments", authMiddleware, addComment);
router.get("/comments/:blogId", getComments);
router.delete("/comments/:id", deleteComment);
router.put("/comments/:id", editComment);

module.exports = router;
