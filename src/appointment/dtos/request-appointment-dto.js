import Joi from 'joi';

const RequestAppointmentDto = Joi.object().keys({
	serviceId: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
		.required()
		.trim(),

	dentistId: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
		.trim(),

	reason: Joi.string().min(10).required().trim(),
});

export default RequestAppointmentDto;
