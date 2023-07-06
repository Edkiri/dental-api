import Appointment, { appointmentStatus } from '../../appointment/appointment-model.js';
import User from '../../user/user-model.js';
import { roles } from '../../user/schemas/user-schema.js';
import Service from '../../service/service-model.js';
import { CANCEL_REASONS, REASONS } from './reasons-data.js';
import { getRandomDateTime } from '../../utils.js';

export async function seedAppointments() {
	const someAppointment = await Appointment.find();
	if (someAppointment.length) return;

	const services = await Service.find({});
	const dentists = await User.find({ roles: { $in: [roles.DENTIST] } });
	const patients = await User.find({ roles: { $in: [roles.USER] } });

	const appointments = [];
	for (let i = 0; i < 100; i += 1) {
		const randomServiceIndex = Math.floor(Math.random() * services.length);
		const randomDentistIndex = Math.floor(Math.random() * dentists.length);
		const randomPatientIndex = Math.floor(Math.random() * patients.length);

		const randomReasonIndex = Math.floor(Math.random().js * REASONS.length);
		const statusValues = Object.values(appointmentStatus);
		const randomIndex = Math.floor(Math.random() * statusValues.length);

		const randomService = services[randomServiceIndex];
		const randomDentist = dentists[randomDentistIndex];
		const randomPatient = patients[randomPatientIndex];
		const randomReason = REASONS[randomReasonIndex];
		const randomStatus = statusValues[randomIndex];
		const randomDate = getRandomDateTime();

		let cancelledReason;
		let cancelledBy;
		if (randomStatus === appointmentStatus.CANCELLED) {
			const randomCancelledReasonIndex = Math.floor(Math.random() * CANCEL_REASONS.length);
			cancelledReason = CANCEL_REASONS[randomCancelledReasonIndex];
			cancelledBy = randomPatient._id;
		}

		const newAppointment = new Appointment({
			reason: randomReason,
			datetime: randomDate,
			patient: randomPatient._id,
			dentist: randomDentist._id,
			service: randomService._id,
			cancelledReason,
			cancelledBy,
			price: randomService.price,
			status: randomStatus,
		});

		appointments.push(newAppointment.save());
	}

	return Promise.all(appointments);
}
