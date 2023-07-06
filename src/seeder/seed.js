import mongoose from 'mongoose';

import config from '../config/config.js';
import { seedSuperadmin, seedDentists, seedAdmin, seedPatients } from './user/user-seeder.js';
import seedServices from './service/service-seed.js';
import { seedAppointments } from './appointment/appointment-seed.js';

const { url, options } = config.mongoose;

mongoose
	.connect(url, options)
	.then(async () => {
		try {
			const superadmin = await seedSuperadmin();
			if (superadmin) console.log('Superadmin has been created');
			console.log('Success seeding user');

			const admin = await seedAdmin();
			if (admin) console.log('Admin has been created');

			const dentists = await seedDentists();
			if (dentists) console.log(`${dentists.length} dentists has been created`);

			const patients = await seedPatients();
			if (patients) console.log(`${patients.length} patients has been created`);

			const services = await seedServices();
			if (services) console.log(`${services.length} services has been created`);

			const appointments = await seedAppointments();
			if (appointments) console.log(`${appointments.length} services has been created`);

			console.log('Success seeding services');
		} catch (error) {
			console.log('Seeder failed! ', error);
		} finally {
			process.exit();
		}
	})
	.catch((error) => console.log(error));
