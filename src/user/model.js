import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: { type: String, required: [true, 'Name is required'] },
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: { type: String, required: true },
});

const User = model('User', UserSchema);

export default User;
