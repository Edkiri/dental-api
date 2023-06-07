import { Schema, model } from 'mongoose';

import ProfileSchema from './profile-schema';

const UserSchema = new Schema({
	name: { type: String, required: [true, 'Name is required'] },

	email: {
		type: String,
		trim: true,
		required: [true, 'Email is required'],
		unique: true,
	},

	password: { type: String, required: true },

	role: {
		type: String,
		enum: ['user', 'admin', 'superadmin'],
		default: 'user',
	},

	profile: ProfileSchema,
});

const User = model('User', UserSchema);

export default User;
