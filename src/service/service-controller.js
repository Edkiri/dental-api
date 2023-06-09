import Service from './service-model';

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
};
