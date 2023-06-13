export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	return next(error);
};

// https://www.topcoder.com/thrive/articles/data-validation-in-nodejs-and-express-using-joi
export const validate = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body);

	if (error) {
		return next(error);
	}
	return next();
};
