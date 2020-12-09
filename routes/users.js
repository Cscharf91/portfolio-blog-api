import { Router } from 'express';
const router = Router();
const usersController = require('../controllers/usersController');

router.get('/', (req, res) => res.send('hi'))
router.post('/register', usersController.register);
router.post('/login', usersController.login);

export default router;