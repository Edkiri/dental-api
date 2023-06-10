import { Schema } from 'mongoose';

import ProfileSchema from './profile-schema';
import DentistProfileSchema from './dentist-schema';

export const roles = {
	USER: 'user',
	DENTIST: 'dentist',
	ADMIN: 'admin',
	SUPERADMIN: 'superadmin',
};

const UserSchema = new Schema(
	{
		email: {
			type: String,
			trim: true,
			required: [true, 'Email is required'],
			unique: true,
		},

		password: { type: String, required: true, trim: true, minLength: 6 },

		roles: {
			type: [{ type: String, enum: Object.values(roles) }],
			trim: true,
			default: [roles.USER],
		},

		profile: ProfileSchema,

		dentistProfile: DentistProfileSchema,
	},
	{ strict: true, timestamps: true }
);

export default UserSchema;
