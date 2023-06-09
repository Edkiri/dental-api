import Service from './service-model';

const findAll = async (req, res, next) => {
	try {
		const services = await Service.find(req.query, {}, { sanitizeFilter: true });

		res.status(201).json({
			success: true,
			data: {
				services,
			},
		});
	} catch (error) {
		next(error);
	}
};

const createService = async (req, res, next) => {
	try {
		const service = new Service(req.body);
		const newService = await service.save();
		res.status(201).json({
			success: true,
			data: {
				service: newService,
			},
		});
	} catch (error) {
		next(error);
	}
};
export default {
	createService,
	findAll,
};
