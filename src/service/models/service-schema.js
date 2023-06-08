import { Schema } from 'mongoose';

const ServiceSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minLength: 2,
			maxLength: 255,
		},

		description: {
			type: String,
			trim: true,
			required: true,
			minLength: 10,
			maxLength: 1000,
		},

		price: {
			type: Number,
			required: true,
			min: [0, 'Price must be positive number'],
		},

		duration: {
			type: Number,
			min: [0, 'Duration must be positive number'],
		},
	},
	{ strict: true }
);

export default ServiceSchema;
