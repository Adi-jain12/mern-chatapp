import express from 'express';

import verifyToken from '../middleware/auth.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', verifyToken, getAllUsers);

export default router;
