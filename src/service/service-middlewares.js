import Service from './service-model';

export const validateService = async (req, res, next) => {
	const { serviceId } = req.body;

	if (!serviceId) {
		const error = new Error(`Field 'serviceId' is required field`);
		res.statusCode = 400;
		return next(error);
	}

	const service = await Service.findById(serviceId);
	if (!service) {
		const error = new Error(`Not found service with id '${serviceId}'`);
		return next(error);
	}
	req.service = service;
	return next();
};
