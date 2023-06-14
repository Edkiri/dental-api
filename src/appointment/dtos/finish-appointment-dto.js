import Joi from 'joi';

const FinishAppointmentDto = Joi.object().keys({
	evaluation: Joi.string().min(10).required().trim(),
});

export default FinishAppointmentDto;
