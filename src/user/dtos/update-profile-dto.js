import Joi from 'joi';

const UpdateProfileDto = Joi.object().keys({
	phoneNumber: Joi.string().trim().required(),
	lastName: Joi.string().min(2).trim().required(),
	firstName: Joi.string().min(2).trim().required(),
	pictureUrl: Joi.string().min(6).uri().trim(),
});

export default UpdateProfileDto;
