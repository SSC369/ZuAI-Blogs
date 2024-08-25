const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
require("dotenv").configDotenv();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use(blogRoutes);
app.use(commentRoutes);

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

app.get("/", (req, res) => {
  res.send("API is working");
});

const mongoUri = process.env.MONGODB_CONNECTION_LINK;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to mongo Successful");
  } catch (error) {
    console.log(error.message);
  }
};

connectToMongo();
