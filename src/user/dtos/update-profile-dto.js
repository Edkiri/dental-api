import Joi from 'joi';

const UpdateProfileDto = Joi.object().keys({
	phoneNumber: Joi.string().trim().required(),
	lastName: Joi.string().min(2).trim().required(),
	firstName: Joi.string().min(2).trim().required(),
});

export default UpdateProfileDto;
