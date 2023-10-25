import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generate } from '../helpers/token.js';
import ROLES from '../constant/role.js';

// register
const register = async (login, password) => {
	if (!password) {
		throw new Error('Passwoed is empty');
	}
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ login, password: passwordHash });
	const token = generate({ id: user.id });

	return { user, token };
};

// login
const login = async (login, password) => {
	if (!login && !password) {
		throw new Error('Password and login is empty');
	}
	const user = await User.findOne({ login });
	if (!user) {
		throw new Error('User not found');
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password');
	}
	const token = generate({ id: user.id });
	return { token, user };
};

const getUsers = () => {
	return User.find();
};
const getRoles = () => {
	return [
		{ id: ROLES.ADMIN, name: 'Admin' },
		{ id: ROLES.MODERATOR, name: 'Moderator' },
		{ id: ROLES.USER, name: 'User' },
	];
};

// (admin) delete user
const deleteUser = (id) => {
	return User.deleteOne({ _id: id });
};

// (admin) edit user(role)
const updateUser = (id, userData) => {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
};

export { register, login, getUsers, getRoles, deleteUser, updateUser };
