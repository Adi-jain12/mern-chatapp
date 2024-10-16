import express from 'express';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import messageRoute from './routes/messageRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING)
	.then(() => console.log('DB Connected'));

app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/chat', messageRoute);

server.listen(process.env.PORT, () => {
	console.log('Server is running');
});
