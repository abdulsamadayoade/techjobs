const  express = require('express');
const  { addPosts, deletePosts, getPostById, getPosts, updatePosts } = require('../controllers/postController.js');
const  { admin, protect } = require('../middleware/authMiddleware.js');
const router = express.Router();




router.route('/').get(getPosts).post(protect, admin, addPosts)
router.route('/:id').get(getPostById).put(protect, admin, updatePosts).delete(protect, admin, deletePosts)


module.exports = router;
