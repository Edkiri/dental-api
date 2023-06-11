import * as bcrypt from 'bcrypt';

import config from '../../config/config';
import User from '../../user/user-model';

async function seedSuperadmin() {
	const admin = await User.find({ roles: { $in: ['superadmin'] } });
	if (!admin.length) {
		const hashedPassword = bcrypt.hashSync(config.admin.password, 10);
		const newAdmin = new User({
			email: config.admin.email,
			password: hashedPassword,
			roles: ['superadmin'],
		});
		return newAdmin.save();
	}
}

export default { seedSuperadmin };
