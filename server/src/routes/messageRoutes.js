import express from 'express';

import verifyToken from '../middleware/auth.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post('/message/:id', verifyToken, sendMessage);
router.get('/message/:id', verifyToken, getMessage);

export default router;
