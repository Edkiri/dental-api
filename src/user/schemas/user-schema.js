import { Schema } from 'mongoose';

import ProfileSchema from './profile-schema';
import DentistSchema from './dentist-schema';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			trim: true,
			required: [true, 'Email is required'],
			unique: true,
		},

		password: { type: String, required: true, trim: true, minLength: 6 },

		role: {
			type: String,
			trim: true,
			enum: ['user', 'dentist', 'admin'],
			default: 'user',
		},

		profile: ProfileSchema,

		dentist: DentistSchema,
	},
	{ strict: true, timestamps: true }
);

export default UserSchema;
