import { Router } from 'express';
import verifyToken from './verifyToken';

const router = Router();
const usersController = require('../controllers/usersController');

router.get('/', verifyToken, (req, res) => res.send('hi'))
router.post('/register', usersController.register);
router.post('/login', usersController.login);

export default router;