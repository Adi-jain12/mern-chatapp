import express from 'express';
import {
	loginUser,
	logout,
	registerUser,
	validateUser,
} from '../controllers/authController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/validate-token', verifyToken, validateUser);
router.post('/logout', logout);

export default router;
