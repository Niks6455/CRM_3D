import { Router } from 'express';
import authCtrl from '../controllers/authController.js';
import { asyncRoute } from '../utils/errors.js';

const router = Router();

router.route('/login').post(asyncRoute(authCtrl.login));
router.route('/registration').post(asyncRoute(authCtrl.registration));
router.route('/svitchRole').post(asyncRoute(authCtrl.svitchRole));
router.route('/getUsers').get(asyncRoute(authCtrl.getUsers));
export default router;