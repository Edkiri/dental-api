import * as bcrypt from 'bcrypt';
import fs from 'fs';

import config from '../../config/config';
import User from '../../user/user-model';
import { roles } from '../../user/schemas/user-schema';

export async function seedSuperadmin() {
	const admin = await User.find({ roles: { $in: [roles.SUPERADMIN] } });
	if (!admin.length) {
		const hashedPassword = bcrypt.hashSync(config.admin.password, 10);
		const newAdmin = new User({
			email: config.admin.email,
			password: hashedPassword,
			roles: [roles.SUPERADMIN],
		});
		return newAdmin.save();
	}
}

export async function seedDentists() {
	const someDentist = await User.find({ roles: { $in: [roles.DENTIST] } });
	if (someDentist.length) return;

	const dentistsData = fs.readFileSync(
		'./src/seeder/user/dentists-data.json',
		'utf8',
		(err, data) => {
			if (err) throw new Error('Error reading dentists-data file');
			return data;
		}
	);
	const dentistsParsed = JSON.parse(dentistsData);

	const promises = dentistsParsed.map((dentist) => {
		const hashedPassword = bcrypt.hashSync(dentist.password, 10);
		const newDentists = new User({
			...dentist,
			password: hashedPassword,
			roles: [roles.DENTIST],
			onBoarded: true,
		});
		return newDentists.save();
	});
	return Promise.all(promises);
}
