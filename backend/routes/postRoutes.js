import express from 'express';
import { addPosts, deletePosts, getPostById, getPosts, updatePosts } from '../controllers/postController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();




router.route('/').get(getPosts).post(protect, admin, addPosts)
router.route('/:id').get(getPostById).put(protect, admin, updatePosts).delete(protect, admin, deletePosts)


export default router;
