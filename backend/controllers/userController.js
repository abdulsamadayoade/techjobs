const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
// const generateToken = require("../utils/generateToken.js");

// @desc     Auth user and get token
// @route    POST /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json("Please provide an email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      message: "User login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: user.getSignedJwtToken(),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register  A new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate name, email and password
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      status: 400,
      message: "Please Fill All Fields",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 400,
      message: "Password do not match",
    });
  }

  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return res.status(400).json({
      status: 400,
      message: "Email do not match correct format",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "Register successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmn: user.isAdmin,
       // token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc 	Get user profile
// @route	GET /api/v1/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      success: true,
      message: "User profile successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.user.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "User update successful",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
       // token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    message: "All users successful",
    data: users,
  });
});
