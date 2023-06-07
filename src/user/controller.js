import User from './model';

const findAll = async (req, res, next) => {
	try {
		const users = await User.find({}, { password: 0 });
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

export default { findAll };
