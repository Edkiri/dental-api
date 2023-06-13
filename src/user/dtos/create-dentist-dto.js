import Joi from 'joi';

const CreateDentistDto = Joi.object().keys({
	identification: Joi.string().min(6).trim().required(),
	specialization: Joi.string().min(2).trim().required(),
	yearsOfExperience: Joi.number().min(0).required(),
	languages: Joi.array().items(Joi.string().trim()).min(1),
});

export default CreateDentistDto;
