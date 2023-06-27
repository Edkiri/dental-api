import serviceService from '../service/service-service';
import Appointment, { appointmentStatus } from './appointment-model';

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

const find = async (query) => {
	const appointments = await Appointment.find(query, {}, { sanitizeFilter: true })
		.populate('dentist', { password: 0 })
		.populate('patient', { password: 0 })
		.populate('cancelledBy', { password: 0 })
		.populate('service');

	return appointments;
};

const updateOne = async (appointmentId, appointmentData) => {
	const { dentistId, serviceId, datetime } = appointmentData;
	const service = await serviceService.findById(serviceId);

	// Crear un servicio aparte para hacer esto
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

export default { create, find, updateOne, findByPatient, findByDentist, findById };
