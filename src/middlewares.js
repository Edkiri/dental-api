export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	return next(error);
};

export const validate = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body);

	if (error) {
		return next(error);
	}
	return next();
};
