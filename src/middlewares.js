// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let { message } = error;

	if (error.name === 'ValidationError') statusCode = 400;

	if (message === 'Unauthorized') statusCode = 401;

	if (error.message.split(' ').slice(0, 2).join('') === 'Notfound') {
		statusCode = 404;
	}

	if (error.name === 'CastError') {
		message = `Value '${error.value}' is not a valid ObjectId`;
		statusCode = 400;
	}

	if (error.code === 11000) {
		statusCode = 400;

		const fields = Object.keys(error.keyPattern);
		message = fields
			.map((field) => {
				const value = error.keyValue[field];
				return `Field: '${field}' with value '${value}' is already in use.`;
			})
			.join(' ');
	}

	res.status(statusCode).json({
		success: false,
		message,
	});
};

export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};
