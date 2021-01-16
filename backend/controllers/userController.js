const  User = require('../models/userModel.js');
const  asyncHandler = require('express-async-handler');
const  generateToken = require('../utils/generateToken.js');

// @desc     Auth user and get token
// @route    POST /api/users/login
// @access   Public
exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Validate email and password
	if (!email || !password) {
		return res.status(400).json('Please provide an email and password');
	}

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register  A new user
// @route   POST /api/user
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	// Validate name, email and password
	if (!name || !email || !password || !confirmPassword) {
		return res.status(400).json({
			status: 400,
			message:'Please Fill All Fields'});
	}

	if (password !== confirmPassword) {
		return res.status(400).json({
			status: 400,
			message:'Password do not match'});
	}

	// if (!name.trim().match(/^[A-Za-z]+$/)) {
	// 	return res.status(400).json({
	// 		status: 400,
	// 		message:'Name must  be alphabets'});
	// }

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
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmn: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc 	Get user profile
// @route	GET /api/users/login
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not Found');
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
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not Found');
	}
});


// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users)
});

