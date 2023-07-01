import serviceService from '../service/service-service';
import { appointmentStatus } from './appointment-model';
import appointmentService from './appointment-service';

const request = async (req, res, next) => {
	try {
		const { reason, serviceId, datetime } = req.body;
		const { dentist } = req;

		let service;
		if (serviceId) service = await serviceService.findById(serviceId);

		const newAppointment = await appointmentService.create({
			reason,
			service,
			dentist,
			datetime,
			patient: req.user,
		});

		return res.status(201).json({
			success: true,
			data: {
				appointment: newAppointment,
			},
		});
	} catch (error) {
		if (error.message === 'Dentist cant be his own patient') {
			res.statusCode = 422;
		}
		return next(error);
	}
};

const findAll = async (req, res, next) => {
	const query = req.query || {};

	try {
		const appointments = await appointmentService.find(query);

		return res.status(200).json({
			success: true,
			count: appointments.length,
			data: {
				appointments,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const comfirm = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;

		const confirmedAppointment = await appointmentService.updateOne(appointmentId, {
			...req.body,
			status: appointmentStatus.CONFIRMED,
		});

		return res.status(200).json({
			success: true,
			data: {
				appointment: confirmedAppointment,
			},
		});
	} catch (error) {
		if (error.name === 'OperationalError') res.statusCode = 400;
		return next(error);
	}
};

const getUserAppointments = async (req, res, next) => {
	try {
		const patientId = req.user.id;

		const userAppointments = await appointmentService.findByPatient(patientId);

		return res.status(200).json({
			success: true,
			count: userAppointments.length,
			data: {
				appointments: userAppointments,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const getDentistAppointments = async (req, res, next) => {
	try {
		const { user } = req;

		const dentistAppointments = await appointmentService.findByDentist(user.id, { ...req.query });

		return res.status(200).json({
			success: true,
			count: dentistAppointments.length,
			data: {
				appointments: dentistAppointments,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const findOne = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;

		const appointment = await appointmentService.findById(appointmentId);

		return res.status(200).json({
			success: true,
			data: {
				appointment,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const cancel = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;
		const { cancelledReason } = req.body;

		const cancelledAppointment = await appointmentService.updateOne(appointmentId, {
			status: appointmentStatus.CANCELLED,
			cancelledReason,
			cancelledBy: req.user,
		});

		return res.status(200).json({
			success: true,
			data: {
				appointment: cancelledAppointment,
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

		const finishedAppointment = await appointmentService.updateOne(appointmentId, {
			status: appointmentStatus.FINISHED,
			evaluation,
		});

		res.status(200).json({
			success: true,
			data: {
				appointment: finishedAppointment,
			},
		});
	} catch (error) {
		return next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { appointmentId } = req.params;
		const { reason, serviceId, datetime } = req.body;
		const { dentist } = req;

		let service;
		if (serviceId) service = await serviceService.findById(serviceId);

		const newAppointment = await appointmentService.update(appointmentId, {
			reason,
			service,
			dentist,
			datetime,
			patient: req.user,
		});

		return res.status(201).json({
			success: true,
			data: {
				appointment: newAppointment,
			},
		});
	} catch (error) {
		if (error.message === 'Dentist cant be his own patient') {
			res.statusCode = 422;
		}
		return next(error);
	}
};

export default {
	request,
	cancel,
	comfirm,
	finish,
	findAll,
	getUserAppointments,
	getDentistAppointments,
	findOne,
	update,
};
