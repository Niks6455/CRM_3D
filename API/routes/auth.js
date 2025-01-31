import { Router } from 'express';
import authCtrl from '../controllers/authController.js';
import { asyncRoute } from '../utils/errors.js';

const router = Router();

router.route('/login').post(asyncRoute(authCtrl.login));
router.route('/registration').post(asyncRoute(authCtrl.registration));

export default router;