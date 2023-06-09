const createPatientRequest = (req, res, next) => {
	try {
		const { user } = req.user;

		res.status(201).json({
			success: true,
			data: {
				user,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default { createPatientRequest };
