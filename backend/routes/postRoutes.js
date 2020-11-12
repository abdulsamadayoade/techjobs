import express from 'express';
import { getPostById, getPosts } from '../controllers/postController.js';
const router = express.Router();




router.route('/').get(getPosts);
router.route('/:id',).get(getPostById)


export default router;
