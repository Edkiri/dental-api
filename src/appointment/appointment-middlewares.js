import Appointment, { appointmentStatus } from './appointment-model';

const maxRequestedCount = 10;

export const countResquested = async (req, res, next) => {
	const requestedAppointments = await Appointment.countDocuments({
		patient: req.user._id,
		status: appointmentStatus.REQUESTED,
	});

	if (requestedAppointments > maxRequestedCount) {
		const error = new Error(
			`User exceeded the limit of ${maxRequestedCount} requested appointment`
		);
		res.statusCode = 400;
		return next(error);
	}
};

export const validateQuery = (req, res, next) => {
	const { status } = req.query;

	if (status) {
		if (!Object.values(appointmentStatus).some((elm) => elm === status)) {
			const validStatusFields = Object.values(appointmentStatus).join(', ');
			const error = new Error(
				`Invalid query field status: '${req.query.status}'. Availables: ${validStatusFields}`
			);

			res.statusCode = 400;
			return next(error);
		}
	}
	next();
};
