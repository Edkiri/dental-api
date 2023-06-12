import serviceService from './service-service';

const find = async (req, res, next) => {
	try {
		const services = await serviceService.find(req.query);

		res.status(200).json({
			success: true,
			count: services.length,
			data: {
				services,
			},
		});
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	try {
		const newService = await serviceService.create(req.body);

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
const updateOne = async (req, res, next) => {
	try {
		const { serviceId } = req.params;
		const updatedService = await serviceService.updateOne(serviceId, req.body);

		res.status(200).json({
			success: true,
			data: {
				service: updatedService,
			},
		});
	} catch (error) {
		next(error);
	}
};

const deleteOne = async (req, res, next) => {
	try {
		const { serviceId } = req.params;
		await serviceService.deleteOne(serviceId);

		res.status(204).json({});
	} catch (error) {
		next(error);
	}
};

const findOne = async (req, res, next) => {
	try {
		const { serviceId } = req.params;
		const service = await serviceService.findById(serviceId);

		res.status(200).json({
			success: true,
			data: {
				service,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default {
	create,
	updateOne,
	find,
	findOne,
	deleteOne,
};
