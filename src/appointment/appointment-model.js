import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema(
	{
		dentist: { type: Schema.Types.ObjectId, ref: 'User' },

		patient: { type: Schema.Types.ObjectId, ref: 'User' },

		datetime: { type: Date, required: true },

		services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],

		status: {
			type: String,
			trim: true,
			enum: ['requested', 'cancelled', 'finished'],
			default: 'requested',
		},
	},
	{ strict: true, timestamps: true }
);

const Appointment = model('Appointment', AppointmentSchema);

export default Appointment;
