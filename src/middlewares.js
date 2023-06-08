export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
	// TODO: Find a better way to do this
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	if (error.name === 'ValidationError') statusCode = 400;
	if (error.message === 'Unauthorized') statusCode = 401;
	// TODO: Handle "E11000 duplicate key error" message and status code.
	res.status(statusCode);
	res.json({
		success: false,
		message: error.message,
	});
};
