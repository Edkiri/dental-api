import serviceService from '../service/service-service.js';
import { escapeRegExp } from '../utils.js';
import Appointment, { appointmentStatus } from './appointment-model.js';

const findById = async (appointmentId) => {
	const appointment = await Appointment.findById(appointmentId)
		.populate('patient', { password: 0 })
		.populate('dentist', { password: 0 })
		.populate('service');

	if (!appointment) throw new Error(`Not found appointment with id '${appointmentId}'`);

	return appointment;
};

const create = async (appointmentData) => {
	if (appointmentData.dentist) {
		if (appointmentData.dentist.id === appointmentData.patient.id) {
			throw new Error('Dentist cant be his own patient');
		}
	}
	const newAppointment = new Appointment(appointmentData);
	if (newAppointment.service) {
		newAppointment.price = newAppointment.service.price;
		newAppointment.duration = newAppointment.service.duration;
	}

	await newAppointment.save();
	return newAppointment;
};

const find = async (appointmentQuery) => {
	const { patientName, dentistName } = appointmentQuery;
	const { startDate, endDate } = appointmentQuery;
	const { status } = appointmentQuery;
	const { dentist } = appointmentQuery;

	let query = Appointment.find()
		.populate('dentist', { password: 0 })
		.populate('patient', { password: 0 })
		.populate('cancelledBy', { password: 0 })
		.populate('service');

	if (startDate) {
		query = query.where('datetime').gte(startDate);
	}
	if (status) {
		query = query.where('status').equals(status);
	}
	if (endDate) {
		query = query.where('datetime').lte(endDate);
	}
	if (patientName) {
		const patientQuery = escapeRegExp(patientName);
		query = query.populate({
			path: 'patient',
			match: {
				$or: [
					{ 'profile.firstName': { $regex: patientQuery, $options: 'i' } },
					{ 'profile.lastName': { $regex: patientQuery, $options: 'i' } },
				],
			},
		});
	}
	if (dentistName) {
		const dentistQuery = escapeRegExp(dentistName);
		query = query.populate({
			path: 'dentist',
			match: {
				$or: [
					{ 'profile.firstName': { $regex: dentistQuery, $options: 'i' } },
					{ 'profile.lastName': { $regex: dentistQuery, $options: 'i' } },
				],
			},
		});
	}
	if (dentist) {
		query = query.where('dentist').equals(dentist);
	}

	let countQuery = Appointment.find();

	if (startDate) {
		countQuery = countQuery.where('datetime').gte(startDate);
	}
	if (status) {
		countQuery = countQuery.where('status').equals(status);
	}
	if (endDate) {
		countQuery = countQuery.where('datetime').lte(endDate);
	}
	if (patientName) {
		const patientQuery = escapeRegExp(patientName);
		countQuery = countQuery.populate({
			path: 'patient',
			match: {
				$or: [
					{ 'profile.firstName': { $regex: patientQuery, $options: 'i' } },
					{ 'profile.lastName': { $regex: patientQuery, $options: 'i' } },
				],
			},
			strictPopulate: true,
		});
	}
	if (dentistName) {
		const dentistQuery = escapeRegExp(dentistName);
		countQuery = countQuery.populate({
			path: 'dentist',
			match: {
				$or: [
					{ 'profile.firstName': { $regex: dentistQuery, $options: 'i' } },
					{ 'profile.lastName': { $regex: dentistQuery, $options: 'i' } },
				],
			},
		});
	}
	if (dentist) {
		countQuery = countQuery.where('dentist').equals(dentist);
	}

	let countAppointments = await countQuery.exec();
	if (dentistName) {
		countAppointments = countAppointments.filter((appointment) => appointment.dentist);
	}
	if (patientName) {
		countAppointments = countAppointments.filter((appointment) => appointment.patient);
	}

	const skip = appointmentQuery.skip || 0;
	const limit = appointmentQuery.limit || 6;

	let appointments = await query.sort({ datetime: -1 }).skip(skip).limit(limit).exec();

	if (dentistName) {
		appointments = appointments.filter((appointment) => appointment.dentist);
	}
	if (patientName) {
		appointments = appointments.filter((appointment) => appointment.patient);
	}

	return { appointments, count: countAppointments.length };
};

const updateOne = async (appointmentId, appointmentData) => {
	const { dentistId, serviceId, datetime } = appointmentData;
	const service = await serviceService.findById(serviceId);

	const fromDate = new Date(datetime).getTime();
	const untilDate = new Date(fromDate + service.duration * 60 * 1000);

	const existingAppointment = await Appointment.findOne({
		dentist: dentistId,
		datetime: { $gt: fromDate, $lt: untilDate },
		status: appointmentStatus.CONFIRMED,
	});
	if (existingAppointment && existingAppointment.id !== appointmentId) {
		const error = new Error(
			`Dentist with id '${dentistId}' already has a confirmed appointment at '${datetime}'.`
		);
		error.name = 'OperationalError';
		throw error;
	}

	const appointment = await Appointment.findByIdAndUpdate(appointmentId, appointmentData, {
		new: true,
		runValidators: true,
	})
		.populate('patient', { password: 0 })
		.populate('dentist', { password: 0, email: 0, profile: { phoneNumber: 0 } })
		.populate('service');

	return appointment;
};

const findByPatient = async (patientId) => {
	const userAppointments = await Appointment.find({ patient: patientId })
		.populate('patient', { password: 0 })
		.populate('dentist', { password: 0, email: 0, profile: { phoneNumber: 0 } })
		.populate('service');

	return userAppointments;
};

const findByDentist = async (dentistId, query) => {
	const dentistAppointments = await Appointment.find({ dentist: dentistId, ...query })
		.populate('patient', { password: 0, email: 0 })
		.populate('dentist', { password: 0, email: 0 })
		.populate('cancelledBy', { password: 0, email: 0 })
		.populate('service');

	return dentistAppointments;
};

const update = async (appointmentId, appointmentData) => {
	const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, appointmentData, {
		new: true,
	});
	return updatedAppointment;
};

export default { create, find, updateOne, findByPatient, findByDentist, findById, update };
