const express = require('express');
const router = express.Router();
const {
	login,
	getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile
} = require('../controllers/userController.js');

const { admin, protect } = require('./../middleware/authMiddleware.js');

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', login);

router
	.route('/profile')
	.get(protect, admin, getUserProfile)
	.put(protect, admin,  updateUserProfile);

module.exports =  router;
