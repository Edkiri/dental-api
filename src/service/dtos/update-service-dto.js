import Joi from 'joi';
import { categories } from '../service-model';

const UpdateServiceDto = Joi.object().keys({
	category: Joi.string()
		.trim()
		.valid(...Object.values(categories)),
	name: Joi.string().trim(),
	description: Joi.string().trim(),
	price: Joi.number().min(1),
	duration: Joi.number().min(1),
});

export default UpdateServiceDto;
