import Joi from 'joi';

const RequestAppointmentDto = Joi.object().keys({
	serviceId: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
		.trim(),

	dentistId: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
		.trim(),

	reason: Joi.string().min(10).required().trim(),

	datetime: Joi.date().min('now').required(),
});

export default RequestAppointmentDto;
