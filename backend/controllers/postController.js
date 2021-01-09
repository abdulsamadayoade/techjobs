const  asyncHandler= require('express-async-handler');
const  Post= require('./../models/postModels.js');

// @desc      Fetch All Posts
// @route     GET /api/posts
// @access    Public

exports.getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({});
	res.status(200).json(posts);
});

// @desc      Fetch one Post
// @route     GET /api/posts/:id
// @access    Public
exports.getPostById = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404);
		throw new Error('Post Not Found');
	}
});

exports.addPosts = asyncHandler(async (req, res) => {
	const {
		jobTitle,
		companyName,
		companyLogo,
		companyWebsite,
		location,
		jobType,
		modeOfExecution,
		aboutUs,
		theRole,
		youAre,
		jobRequirements,
		niceToHave,
		benefits,
		ourValues,
		howToApply,
	} = req.body;

	if (
		!jobTitle ||
		!companyName ||
		!companyWebsite ||
		!location ||
		!jobType ||
		!jobRequirements ||
		!benefits ||
		!howToApply
	) {
		throw new Error('Fill all fields');
	} else {
		const post = new Post({
			user: req.user._id,
			jobTitle,
			companyName,
			companyLogo,
			companyWebsite,
			location,
			jobType,
			modeOfExecution,
			aboutUs,
			theRole,
			youAre,
			jobRequirements,
			niceToHave,
			benefits,
			ourValues,
			howToApply,
		});

		const createdPost = await post.save();
		res.status(201).json(createdPost);
	}
});

// @desc      Update posts
// @route     PUT /api/users/posts
// @access    Private
exports.updatePosts = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (post) {
		(post.user = req.user._id || post.user),
			(post.jobTitle = req.body.jobTitle || post.jobTitle),
			(post.companyName = req.body.companyName || post.companyName),
			(post.companyLogo = req.body.companyLogo || post.companyLogo),
			(post.companyWebsite = req.body.companyWebsite || post.companyWebsite),
			(post.location = req.body.location || post.location),
			(post.jobType = req.body.jobType || post.jobType),
			(post.modeOfExecution = req.body.modeOfExecution || post.modeOfExecution),
			(post.aboutUs = req.body.aboutUs || post.aboutUs),
			(post.theRole = req.body.theRole || post.theRole),
			(post.youAre = req.body.youAre || post.youAre),
			(post.jobRequirements = req.body.jobRequirements || post.jobRequirements),
			(post.niceToHave = req.body.niceToHave || post.niceToHave),
			(post.benefits = req.body.benefits || post.benefits),
			(post.ourValues = req.body.ourValues || post.ourValues),
			(post.howToApply = req.body.howToApply || post.howToApply);

		const updatedPost = await post.save();

		res.status(200).json({
			jobTitle: updatedPost.jobTitle,
			companyName: updatedPost.companyName,
			companyLogo: updatedPost.companyLogo,
			companyWebsite: updatedPost.companyWebsite,
			location: updatedPost.location,
			jobType: updatedPost.jobType,
			modeOfExecution: updatedPost.modeOfExecution,
			aboutUs: updatedPost.aboutUs,
			theRole: updatedPost.theRole,
			youAre: updatedPost.youAre,
			jobRequirements: updatedPost.jobRequirements,
			niceToHave: updatedPost.niceToHave,
			benefits: updatedPost.benefits,
			ourValues: updatedPost.ourValues,
			howToApply: updatedPost.howToApply,
		});
	} else {
		res.status(404);
		throw new Error('Post cannot be Updated');
	}
});



// @desc      Delete Post
// @route     DELETE /api/posts/
// @access    Private
exports.deletePosts = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post) {
		await post.remove()
		res.status(200).json({message : "Post Deleted"});
	} else {
		res.status(404);
		throw new Error('Post Not Found');
	}
	
});

