import Appointment from './appointment-model';

const createPatientRequest = async (req, res, next) => {
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

export default { createPatientRequest };
