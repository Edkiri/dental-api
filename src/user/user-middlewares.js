import User from './user-model';

export const validateDentist = async (req, res, next) => {
	const { dentistId } = req.body;

	if (!dentistId) return next();

	try {
		const dentist = await User.findById(dentistId, { email: 0, password: 0 });
		if (!dentist) {
			throw new Error(`Not found dentist with id '${dentistId}'`);
		}

		if (!dentist.roles.includes('dentist')) {
			res.statusCode = 400;
			throw new Error(`Dentist is not a valid dentist`);
		}

		if (!dentist.dentistProfile.isActive) {
			res.statusCode = 400;
			throw new Error(`${dentist.firstName} ${dentist.lastName} is not an active dentist`);
		}

		req.dentist = dentist;
		return next();
	} catch (error) {
		next(error);
	}
};
