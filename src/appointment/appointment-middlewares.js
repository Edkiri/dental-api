import Appointment, { appointmentStatus } from './appointment-model';
import User from '../user/user-model';

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

	return next();
};

export const validateQuery = (req, res, next) => {
	const { status } = req.query;

	if (!status) return next();

	if (!Object.values(appointmentStatus).some((elm) => elm === status)) {
		const validStatusFields = Object.values(appointmentStatus).join(', ');

		const error = new Error(
			`Not found status: '${req.query.status}'. Availables: ${validStatusFields}`
		);

		res.statusCode = 400;
		return next(error);
	}
	return next();
};

export const validateDentist = async (req, res, next) => {
	const { dentistId } = req.body;
	if (!dentistId) return next();

	const dentist = await User.findById(dentistId);
	if (!dentist) {
		const error = new Error(`Not found dentist with id '${dentistId}'`);
		return next(error);
	}

	req.dentist = dentist;
	return next();
};
