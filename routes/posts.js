import { Router } from 'express';
const router = Router();
const postsController = require('../controllers/postsController');

router.get('/', (req, res) => res.send('hi'))
router.post('/register', postsController.register);
router.post('/login', postsController.login);

export default router;