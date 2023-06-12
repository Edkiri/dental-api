import Appointment, { appointmentStatus } from './appointment-model';

const request = async (req, res, next) => {
	try {
		const { reason } = req.body;
		const { service, dentist } = req;

		const newAppointment = new Appointment({
			reason,
			service,
			dentist,
			patient: req.user,
		});
		await newAppointment.save();

		const appointment = newAppointment.toJSON();
		delete appointment.dentist.profile.phoneNumber;

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
			.populate('dentist', { password: 0 })
			.populate('patient', { password: 0 })
			.populate('cancelledBy', { password: 0 })
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

const comfirm = async (req, res, next) => {
	try {
		const { datetime } = req.body;
		if (!datetime) {
			const error = new Error("Missing 'datetime' requiered field");
			res.statusCode = 400;
			return next(error);
		}

		const { appointmentId } = req.params;

		const appointment = await Appointment.findByIdAndUpdate(
			appointmentId,
			{ ...req.body, status: appointmentStatus.CONFIRMED },
			{
				new: true,
				runValidators: true,
			}
		)
			.populate('dentist', { password: 0 })
			.populate('patient', { password: 0 })
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
			.populate('patient', { password: 0 })
			.populate('dentist', { password: 0, email: 0, profile: { phoneNumber: 0 } })
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

		const dentistAppointments = await Appointment.find({ ...req.query, dentist: user })
			.populate('patient', { password: 0, email: 0 })
			.populate('dentist', { password: 0, email: 0 })
			.populate('cancelledBy', { password: 0, email: 0 })
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

const findOne = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;

		const appointment = await Appointment.findById(appointmentId)
			.populate('patient', { password: 0 })
			.populate('dentist', { password: 0 })
			.populate('cancelledBy', { password: 0 })
			.populate('service');

		return res.status(200).json({
			success: true,
			data: {
				appointment,
			},
		});
	} catch (error) {
		next(error);
	}
};

const cancel = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;
		const { cancelledReason } = req.body;

		if (!cancelledReason) {
			const error = new Error("Missing 'cancelledReason' requiered field");
			res.statusCode = 400;
			return next(error);
		}

		const appointment = await Appointment.findByIdAndUpdate(
			appointmentId,
			{
				status: appointmentStatus.CANCELLED,
				cancelledBy: req.user,
				cancelledReason,
			},
			{
				new: true,
				runValidators: true,
			}
		)
			.populate('patient', { password: 0 })
			.populate('dentist', { password: 0, email: 0, profile: { phoneNumber: 0 } })
			.populate('cancelledBy', { password: 0, email: 0, profile: { phoneNumber: 0 } })
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

const finish = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;
		const { evaluation } = req.body;

		if (!evaluation) {
			const error = new Error("Missing 'evaluation' requiered field");
			res.statusCode = 400;
			return next(error);
		}

		const appointment = await Appointment.findByIdAndUpdate(
			appointmentId,
			{
				status: appointmentStatus.FINISHED,
				evaluation,
			},
			{
				new: true,
				runValidators: true,
			}
		)
			.populate('patient', { password: 0 })
			.populate('dentist', { password: 0 })
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

export default {
	request,
	find,
	comfirm,
	getUserAppointments,
	getDentistAppointments,
	findOne,
	cancel,
	finish,
};
