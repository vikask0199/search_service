import express from 'express';
import { login, signup } from '../controllers/authController';
import { checkAuthorizeOrNot } from '../middlewares/checkAuthorizeOrNot';

const router = express.Router();

// router.post('/signup', checkAuthorizeOrNot, signup);
router.post('/login', login);


export default router