import { Schema, model } from 'mongoose';

export const appointmentStatus = {
	REQUESTED: 'requested',
	CONFIRMED: 'confirmed',
	CANCELLED: 'cancelled',
	FINISHED: 'finished',
};

const AppointmentSchema = new Schema(
	{
		dentist: { type: Schema.Types.ObjectId, ref: 'User' },

		patient: { type: Schema.Types.ObjectId, ref: 'User' },

		service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },

		datetime: { type: Date },

		reason: { type: String, trim: true, required: true, minLength: 10, maxLength: 255 },

		price: {
			type: Number,
			required: true,
			min: [0, 'Price must be positive number'],
		},

		duration: {
			type: Number,
			required: true,
			min: [0, 'Duration must be positive number'],
		},

		cancelledBy: { type: Schema.Types.ObjectId, ref: 'User' },

		cancelledReason: { type: String, trim: true, minLength: 10, maxLength: 255 },

		status: {
			type: String,
			trim: true,
			enum: Object.values(appointmentStatus),
			default: appointmentStatus.REQUESTED,
		},
	},
	{ strict: true, timestamps: true }
);

const Appointment = model('Appointment', AppointmentSchema);

export default Appointment;
