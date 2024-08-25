const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  lastUpdated: {
    type: Date,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
