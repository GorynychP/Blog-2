import Post from '../models/Post.js';

//  add
const addPost = async (post) => {
	const newPost = await Post.create(post);
	await newPost.populate({
		path: 'comments',
		populate: 'author',
	});
	return newPost;
};
// edit
const editPost = async (id, post) => {
	const newPost = await Post.findByIdAndUpdate(id, post, {
		returnDocument: 'after',
	});

	await newPost.populate({
		path: 'comments',
		populate: 'author',
	});

	return newPost;
};
// delete
const deletePost = async (id) => {
	return Post.deleteOne({ _id: id });
};
// get item
const getPost = async (id) => {
	const post = await Post.findById(id);

	await post.populate({ path: 'comments', populate: 'author' });

	return post;
};
// get list with search and pagination
const getPosts = async (search = '', limit = 9, page = 1) => {
	const [posts, count] = await Promise.all([
		Post.find({ title: { $regex: search, $options: 'i' } }) // Поиск по search, с исопльзованием регулярного выражения. $options: 'i' - означает регистронезависимость
			.limit(limit) // для отрезания количество постов
			.skip((page - 1) * limit) // для пропуска предыдущих страниц
			.sort({ createdAt: -1 }), // сортировка по дате, -1 это по убыванию, 1 по возрастанию
		Post.countDocuments({ title: { $regex: search, $options: 'i' } }), // узнаем сколько есть постов всего
	]);

	return {
		posts,
		lastPage: Math.ceil(count / limit), // Определили сколько всего страниц
	};
};

export { addPost, editPost, deletePost, getPost, getPosts };
