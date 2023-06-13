import userService from './user-service';

const getProfile = async (req, res, next) => {
	try {
		const { user } = req;

		return res.status(200).json({
			success: true,
			data: {
				user,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const findAll = async (req, res, next) => {
	try {
		const users = await userService.findAll(req.query);

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

		const updatedUser = await userService.updateOne(user.id, user);

		res.status(200).json({
			success: true,
			data: { user: updatedUser },
		});
	} catch (error) {
		next(error);
	}
};

const updateDentist = async (req, res, next) => {
	try {
		const { userId } = req.params;

		const dentist = await userService.createDentist(userId, req.body);

		res.status(200).json({
			success: true,
			data: { user: dentist },
		});
	} catch (error) {
		next(error);
	}
};

export default { findAll, updateProfile, updateDentist, getProfile };
