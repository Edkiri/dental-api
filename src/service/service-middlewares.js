import Service from './service-model';

export const requiredService = async (req, res, next) => {
	const { serviceId } = req.body;

	if (!serviceId) {
		const error = new Error(`Field 'serviceId' is required field`);
		res.statusCode = 400;
		return next(error);
	}

	const service = await Service.findById(serviceId);

	req.service = service;
	return next();
};
