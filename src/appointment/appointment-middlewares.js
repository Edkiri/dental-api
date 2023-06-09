import Appointment, { appointmentStatus } from './appointment-model';

export const countResquested = async (req, res, next) => {
	const requestedAppointments = await Appointment.countDocuments({
		patient: req.user._id,
		status: appointmentStatus.REQUESTED,
	});

	if (requestedAppointments > 10) {
		const error = new Error('User exceeded the limit of 10 appointment requests');
		res.statusCode = 400;
		return next(error);
	}
};
