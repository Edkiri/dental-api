import mongoose from 'mongoose';

import config from '../config/config';
import { seedSuperadmin, seedDentists } from './user/user-seeder';
import seedServices from './service/service-seed';

const { url, options } = config.mongoose;

mongoose
	.connect(url, options)
	.then(async () => {
		try {
			const superadmin = await seedSuperadmin();
			if (superadmin) console.log('Superadmin has been created');
			console.log('Success seeding user');

			const dentists = await seedDentists();
			if (dentists) console.log(`${dentists.length} dentists has been created`);

			const services = await seedServices();
			if (services) console.log(`${services.length} services has been created`);
			console.log('Success seeding services');
		} catch (error) {
			console.log('Seeder failed! ', error);
		} finally {
			process.exit();
		}
	})
	.catch((error) => console.log(error));
