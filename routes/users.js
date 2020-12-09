import { Router } from 'express';
const router = Router();
import usersController from '../controllers/usersController';

router.get('/register', usersController.register);

export default router;