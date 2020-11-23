const express = require('express');
const router = express.Router();
const {
	authUser,
	getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile
} = require('../controllers/userController.js');
const { admin, protect } = require('./../middleware/authMiddleware.js');

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, admin, getUserProfile)
	.put(protect, admin,  updateUserProfile);

module.exports =  router;
