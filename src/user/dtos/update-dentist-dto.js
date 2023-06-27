import Joi from 'joi';

const UpdateDentistDto = Joi.object().keys({
	specialization: Joi.string().min(2).trim().required(),
	yearsOfExperience: Joi.number().min(0).required(),
	languages: Joi.array().items(Joi.string().trim()).min(1),
});

export default UpdateDentistDto;
