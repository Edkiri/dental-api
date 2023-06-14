import Joi from 'joi';

const ConfirmAppointmentDto = Joi.object().keys({
	datetime: Joi.date().min('now').required(),

	serviceId: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
		.required()
		.trim(),

	dentistId: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
		.required()
		.trim(),
});

export default ConfirmAppointmentDto;
