import { Schema } from 'mongoose';

const ProfileSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: [true, 'First name is required'],
			minLength: 2,
			maxLength: 100,
		},

		lastName: {
			type: String,
			trim: true,
			required: [true, 'Last name is required'],
			minLength: 2,
			maxLength: 100,
		},

		phoneNumber: {
			type: String,
			trim: true,
			required: [true, 'Phone number is required'],
		},
	},
	{ strict: true, skipVersioning: true, timestamps: false }
);

export default ProfileSchema;
