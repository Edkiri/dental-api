import fs from 'fs';
import Service from '../../service/service-model.js';

async function seedServices() {
	const someService = await Service.findOne();
	if (someService) return;

	const services = fs.readFileSync(
		'./src/seeder/service/services-data.json',
		'utf8',
		(err, data) => {
			if (err) throw new Error('Error reading service-data file');
			return data;
		}
	);

	const servicesParsed = JSON.parse(services);

	const promises = servicesParsed.map((service) => {
		const newService = new Service(service);
		return newService.save();
	});
	return Promise.all(promises);
}

export default seedServices;
