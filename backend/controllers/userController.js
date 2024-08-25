const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    //check that is there a same username exits
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ msg: "Username is already used!" });
    }

    //check that is there a same email exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email is already registered!" });
    }

    //create a hashed pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const user = await User.findOne({ email });
    const secretKey = process.env.JWT_SECRET;
    const payload = {
      username: user.username,
      email,
      userId: user._id,
    };
    const jwtToken = jwt.sign(payload, secretKey);

    return res.status(201).json({ jwtToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //authentication for user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Email is not registered!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ msg: "Password Incorrect :(" });

    const secretKey = process.env.JWT_SECRET;
    const payload = {
      username: user.username,
      email,
      userId: user._id,
    };
    const jwtToken = jwt.sign(payload, secretKey);

    return res.status(200).json({ jwtToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    const { username, password, profileImage } = req.body;
    const { email } = req.user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.updateOne(
      { email },
      {
        $set: {
          username,
          password: hashedPassword,
          profileImage,
        },
      }
    );
    const user = await User.findOne({ email });
    const secretKey = process.env.JWT_SECRET;
    const payload = {
      username,
      email,
      userId: user._id,
    };
    const jwtToken = await jwt.sign(payload, secretKey);

    res.status(200).json({ msg: "Profile updated successfully", jwtToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server issue :(" });
  }
};

module.exports.userProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, profileImage, email } = await User.findById(userId);

    return res
      .status(200)
      .json({ userDetails: { username, profileImage, userId, email } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server issue :(" });
  }
};
