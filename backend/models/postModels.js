const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		jobTitle: {
			type: String,
			required: true,
		},
		companyName: {
			type: String,
			required: true,
		},
		companyLogo: {
			type: String,
			required: true,
		},
		durationFromDataPosted: {
			type: Date,
            default: Date.now()
		},
		companyWebsite: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		jobType: {
			type: String,
			required: true,
        },
        modeOfExecution: {
			type: String,
			required: true,
        },
		aboutUs: {
			type: String,
			required: true,
		},
		theRole: {
			type: String,
			required: true,
		},
		youAre: {
			type: Array,
			required: true,
		},

		jobRequirements: {
			type: Array,
			required: true,
		},
		niceToHave: {
			type: Array,
			required: true,
		},
		benefits: {
			type: Array,
			required: true,
		},
		ourValues: {
			type: String,
			required: true,
		},
		howToApply: {
			type: String,
			required: true,
        },
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
