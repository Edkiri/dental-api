import { model } from 'mongoose';

import UserSchema from './schemas/user-schema.js';

const User = model('User', UserSchema);

export default User;
