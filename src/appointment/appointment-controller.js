import Appointment from './appointment-model';

const create = async (req, res, next) => {
	try {
		const { reason } = req.body;
		const { service, dentist } = req;

		const newAppointment = new Appointment({
			reason,
			service,
			dentist,
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

const getUserAppointments = async (req, res, next) => {
	try {
		const { user } = req;

		const userAppointments = await Appointment.find({ patient: user.id })
			.populate('patient')
			.populate('dentist')
			.populate('service');

		return res.status(200).json({
			success: true,
			count: userAppointments.length,
			data: {
				appointments: userAppointments,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getDentistAppointments = async (req, res, next) => {
	try {
		const { user } = req;

		const dentistAppointments = await Appointment.find({ dentist: user })
			.populate('patient')
			.populate('dentist')
			.populate('service');

		return res.status(200).json({
			success: true,
			count: dentistAppointments.length,
			data: {
				appointments: dentistAppointments,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default { create, find, update, getUserAppointments, getDentistAppointments };
