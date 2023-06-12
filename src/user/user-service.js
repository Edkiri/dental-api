import User from './user-model';
import { roles } from './schemas/user-schema';

const findAll = async (query) => {
	return User.find(query, { password: 0 }, { sanitizeFilter: true });
};

const updateOne = async (userId, data) => {
	return User.findByIdAndUpdate(userId, data, {
		new: true,
		runValidators: true,
		fields: { password: 0, email: 0 },
	});
};

const findById = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new Error(`Not found user with id '${userId}'`);
	}
	return user;
};

const createDentist = async (userId, dentistData) => {
	const user = await findById(userId);

	user.dentistProfile = dentistData;
	user.roles.push(roles.DENTIST);

	const dentist = await User.findByIdAndUpdate(user.id, user, {
		new: true,
		runValidators: true,
		fields: { password: 0 },
	});

	return dentist;
};

export default { findAll, updateOne, findById, createDentist };
