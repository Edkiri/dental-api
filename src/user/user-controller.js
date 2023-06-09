import User from './user-model';

const findAll = async (req, res, next) => {
	try {
		const users = await User.find(req.query, { password: 0 }, { sanitizeFilter: true });

		res.status(200).json({
			success: true,
			count: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		next(error);
	}
};

const updateProfile = async (req, res, next) => {
	try {
		const { user } = req;

		user.profile = req.body;

		const updatedUser = await User.findByIdAndUpdate(user.id, user, {
			new: true,
			runValidators: true,
			fields: { password: 0 },
		});

		res.status(200).json({
			success: true,
			data: { user: updatedUser },
		});
	} catch (error) {
		next(error);
	}
};

const createDentist = async (req, res, next) => {
	try {
		const { user } = req;
		user.dentist = req.body;
		user.role = 'dentist';

		const updatedUser = await User.findByIdAndUpdate(user.id, user, {
			new: true,
			runValidators: true,
			fields: { password: 0 },
		});

		res.status(200).json({
			success: true,
			data: { user: updatedUser },
		});
	} catch (error) {
		next(error);
	}
};

export default { findAll, updateProfile, createDentist };
