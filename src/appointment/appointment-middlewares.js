import Appointment, { appointmentStatus } from './appointment-model.js';
import appointmentService from './appointment-service.js';

const maxRequestedCount = 10;

export const countResquested = async (req, res, next) => {
	try {
		const requestedAppointments = await Appointment.countDocuments({
			patient: req.user._id,
			status: appointmentStatus.REQUESTED,
		});

		if (requestedAppointments > maxRequestedCount) {
			const error = new Error(
				`User exceeded the limit of ${maxRequestedCount} requested appointments`
			);
			res.statusCode = 400;
			return next(error);
		}
		return next();
	} catch (error) {
		return next(error);
	}
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

export const isOwner = async (req, res, next) => {
	const { user } = req;
	if (user.roles.includes('admin') || user.roles.includes('superadmin')) return next();

	try {
		const { appointmentId } = req.params;

		const appointment = await appointmentService.findById(appointmentId);

		if (user.id !== appointment.patient.id && user.id !== appointment.dentist.id) {
			throw new Error('Unauthorized');
		}

		return next();
	} catch (error) {
		return next(error);
	}
};
