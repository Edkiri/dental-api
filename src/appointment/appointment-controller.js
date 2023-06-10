import Appointment from './appointment-model';

const create = async (req, res, next) => {
	try {
		const { reason, service } = req.body;

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

const find = async (req, res, next) => {
	const query = req.query || {};

	try {
		const requestedAppointments = await Appointment.find(query, {}, { sanitizeFilter: true })
			.populate('patient', { password: 0 })
			.populate('service');

		res.status(200).json({
			success: true,
			count: requestedAppointments.length,
			data: {
				appointments: requestedAppointments,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;

		const appointment = await Appointment.findByIdAndUpdate(appointmentId, req.body, {
			new: true,
			runValidators: true,
		})
			.populate('dentist')
			.populate('patient')
			.populate('service');
		if (!appointment) {
			throw new Error(`Not found appointment with id '${appointmentId}'`);
		}

		res.status(200).json({
			success: true,
			data: {
				appointment,
			},
		});
	} catch (error) {
		return next(error);
	}
};

export default { create, find, update };
