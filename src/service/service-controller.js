import Service from './service-model';

const findAll = async (req, res, next) => {
	try {
		const services = await Service.find(req.query, {}, { sanitizeFilter: true });

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
const updateOne = async (req, res, next) => {
	try {
		const { serviceId } = req.params;
		const updatedService = await Service.findByIdAndUpdate(serviceId, req.body, {
			new: true,
			runValidators: true,
		});

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
		await Service.findByIdAndRemove(serviceId);

		res.status(204).json({});
	} catch (error) {
		next(error);
	}
};

const findOne = async (req, res, next) => {
	try {
		const { serviceId } = req.params;
		const service = await Service.findById(serviceId);

		if (!service) throw new Error(`Not found service with id '${serviceId}'`);

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
	findAll,
	findOne,
	deleteOne,
};
