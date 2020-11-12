import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
//import users from './data/users.js'
import posts from '../data/post.js'
//import User from './models/userModel.js';
import Post from "../models/postModels.js"
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		//await User.deleteMany();
		await Post.deleteMany();

		//const createdUser = await User.insertMany(users);
		const createdPost = await Post.insertMany(posts);


		console.log('data inported'.green.inverse)
		process.exit(0);
	} catch (error) {
		console.error(`${error.message}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		//await User.deleteMany();
		await Post.deleteMany();
		console.log('data destroyed'.red.inverse);
		process.exit(0);
	} catch (error) {
		console.error(`${error.message}`.red.inverse);
		process.exit(1);
	}
};



if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}


