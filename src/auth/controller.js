import * as bcrypt from 'bcrypt';
import User from '../user/model';

const signup = async (req, res, next) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);
		const user = new User({
			...req.body,
			password: hashedPassword,
		});
		const newUser = await user.save();
		res.status(201).json({
			status: 'success',
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default { signup };
