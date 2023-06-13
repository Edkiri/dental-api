import express from 'express';

import authRouter from './auth/auth-router';
import userRouter from './user/user-router';
import serviceRouter from './service/service-router';
import appointmentRouter from './appointment/appointment-router';
import { notFound, errorHandler } from './middlewares';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		success: true,
		data: {
			message: 'Todo chevere',
		},
	});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/appointment', appointmentRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
