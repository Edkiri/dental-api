import Appointment, { appointmentStatus } from './appointment-model';

const createPatientRequest = async (req, res, next) => {
	try {
		const { reason, service } = req.body;

		const requestedAppointments = await Appointment.countDocuments({
			patient: req.user._id,
			status: appointmentStatus.REQUESTED,
		});
		if (requestedAppointments > 10) {
			const error = new Error('User exceeded the limit of 10 appointment requests');
			res.statusCode = 400;
			return next(error);
		}

		const newAppointment = new Appointment({
			reason,
			service,
			patient: req.user,
		});
		const appointment = await newAppointment.save();

		res.status(201).json({
			success: true,
			data: {
				appointment,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default { createPatientRequest };
