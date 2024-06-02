import express from 'express';
import { login, signup } from '../controllers/authController';
import { checkAuthorizeOrNot } from '../middlewares/checkAuthorizeOrNot';

const router = express.Router();

// router.post('/signup', signup);
router.post('/user/api/v1/login', login);


export default router