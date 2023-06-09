import { Schema } from 'mongoose';

const DentistSchema = new Schema(
	{
		specialization: {
			type: String,
			trim: true,
			required: true,
			minLength: 2,
			maxLength: 255,
		},

		identification: {
			type: String,
			trim: true,
			required: true,
			minLength: 6,
			maxLength: 255,
		},

		salary: {
			type: Number,
			required: true,
			min: [0, 'Salary has to be a positive number'],
		},

		yearsOfExperience: {
			type: Number,
			required: true,
			min: [0, 'Experience has to be a positive number'],
		},

		languages: { type: [String], required: true },

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ strict: true, timestamps: true }
);

export default DentistSchema;