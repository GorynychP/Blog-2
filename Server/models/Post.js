import mongoose from 'mongoose';
import validator from 'validator';
const PostSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
			validator: {
				validator: validator.isURL,
				message: 'Image should be avalid url',
			},
		},
		content: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true },
);

const Post = mongoose.model('Post', PostSchema);

export default Post;