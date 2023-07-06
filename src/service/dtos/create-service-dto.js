import Joi from 'joi';
import { categories } from '../service-model.js';

const CreateServiceDto = Joi.object().keys({
	category: Joi.string()
		.trim()
		.valid(...Object.values(categories))
		.required(),
	name: Joi.string().trim().required(),
	description: Joi.string().trim().required(),
	price: Joi.number().min(1).required(),
	duration: Joi.number().min(1).required(),
});

export default CreateServiceDto;
