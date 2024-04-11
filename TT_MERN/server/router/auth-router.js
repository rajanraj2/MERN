import express from 'express';
import home, {register} from '../controllers/auth-controller.js';

// Use 'home' as needed

const router = express.Router();    
const homie = home;
const registerUser = register;

router.route('/').get(home);

router.route('/register').post(registerUser);

export default router;
