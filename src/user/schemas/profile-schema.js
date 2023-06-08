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

		LastName: {
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

		address: { type: String, trim: true },

		pictureUrl: { type: String, trim: true },
	},
	{ strict: true, timestamps: true }
);

export default ProfileSchema;
