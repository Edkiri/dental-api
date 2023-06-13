import Joi from 'joi';

const CancelAppointmentDto = Joi.object().keys({
	cancelledReason: Joi.string().min(10).required().trim(),
});

export default CancelAppointmentDto;
