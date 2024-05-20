import express from 'express';
import { login, signup } from '../controllers/aurthController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);


export default router