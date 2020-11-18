import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile
} from '../controllers/userController.js';
import { admin, protect } from './../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, admin, getUserProfile)
	.put(protect, admin,  updateUserProfile);

export default router;
