import Service from './service-model.js';

const create = async (serviceData) => {
	const service = new Service(serviceData);
	const newService = await service.save();
	return newService;
};

const find = async (query) => {
	const services = await Service.find(query, {}, { sanitizeFilter: true });
	return services;
};

const updateOne = async (serviceId, serviceData) => {
	await Service.findById(serviceId);
	const updatedService = await Service.findByIdAndUpdate(serviceId, serviceData, {
		new: true,
		runValidators: true,
	});
	return updatedService;
};

const deleteOne = async (serviceId) => {
	await Service.findById(serviceId);
	return Service.findByIdAndRemove(serviceId);
};

const findById = async (serviceId) => {
	const service = await Service.findById(serviceId);
	if (!service) throw new Error(`Not found service with id '${serviceId}'`);
	return service;
};

export default { create, find, updateOne, deleteOne, findById };
