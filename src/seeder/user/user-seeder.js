import * as bcrypt from 'bcrypt';
import fs from 'fs';

import config from '../../config/config.js';
import User from '../../user/user-model.js';
import { roles } from '../../user/schemas/user-schema.js';

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

export async function seedPatients() {
	const somePatient = await User.find({ roles: { $in: [roles.USER] } });
	if (somePatient.length) return;

	const patientData = fs.readFileSync(
		'./src/seeder/user/patient-data.json',
		'utf8',
		(err, data) => {
			if (err) throw new Error('Error reading patient-data file');
			return data;
		}
	);
	const patientParsed = JSON.parse(patientData);

	const promises = patientParsed.map((patient) => {
		const hashedPassword = bcrypt.hashSync(patient.password, 10);
		const newPatient = new User({
			...patient,
			password: hashedPassword,
			onBoarded: true,
		});
		return newPatient.save();
	});
	return Promise.all(promises);
}

export async function seedAdmin() {
	const someAdmin = await User.find({ roles: { $in: [roles.ADMIN] } });
	if (someAdmin.length) return;

	const adminData = fs.readFileSync('./src/seeder/user/admin-data.json', 'utf8', (err, data) => {
		if (err) throw new Error('Error reading admin-data file');
		return data;
	});
	const adminParsed = JSON.parse(adminData);

	const hashedPassword = bcrypt.hashSync(adminParsed.password, 10);
	const newDentists = new User({
		...adminParsed,
		password: hashedPassword,
		roles: [roles.ADMIN],
		onBoarded: true,
	});
	return newDentists.save();
}
