import asyncHandler from 'express-async-handler';
import Post from './../models/postModels.js';

// @desc Fetch All Posts
// @route GET /api/posts
// @access Public

const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post .find({});
	res.json(posts);
});

// @desc Fetch one Post
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post) {
		res.json(post);
	} else {
		res.status(404);
		throw new Error('Post Not Found');
	}
});

export { getPosts, getPostById };
