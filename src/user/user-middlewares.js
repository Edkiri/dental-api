import userService from './user-service.js';

export const validateDentist = async (req, res, next) => {
	const { dentistId } = req.body;

	if (!dentistId) return next();

	try {
		const dentist = await userService.findById(dentistId);

		if (!dentist.roles.includes('dentist')) {
			res.statusCode = 400;
			throw new Error(`Not a valid dentist`);
		}

		if (!dentist.dentistProfile.isActive) {
			res.statusCode = 400;
			throw new Error(`Not a valid dentist`);
		}

		req.dentist = dentist;
		return next();
	} catch (error) {
		return next(error);
	}
};
