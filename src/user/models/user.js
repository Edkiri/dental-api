import { Schema, model } from 'mongoose';

import ProfileSchema from './profile-schema';

const UserSchema = new Schema({
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
		enum: ['user', 'admin', 'superadmin'],
		default: 'user',
	},

	profile: ProfileSchema,
});

const User = model('User', UserSchema);

export default User;
