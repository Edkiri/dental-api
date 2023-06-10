import User from './user-model';

export const validateDentist = async (req, res, next) => {
	const { dentistId } = req.body;

	if (!dentistId) return next();

	const dentist = await User.findById(dentistId, { email: 0, password: 0, roles: 0 });
	if (!dentist) {
		const error = new Error(`Not found dentist with id '${dentistId}'`);
		return next(error);
	}

	if (!dentist.dentistProfile.isActive) {
		res.statusCode = 400;
		const error = new Error(`${dentist.firstName} ${dentist.lastName} is not an active dentist`);
		return next(error);
	}

	req.dentist = dentist;
	return next();
};
