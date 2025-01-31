import { Router } from 'express';
import bookShelfCtrl from '../controllers/bookShelfController.js';
import { asyncRoute } from '../utils/errors.js';
import verify from '../middlewares/checkToken.js';

const router = Router();

router.route('/').post(asyncRoute(verify.general),asyncRoute(bookShelfCtrl.create));
router.route('/').get(asyncRoute(verify.general),asyncRoute(bookShelfCtrl.getAll));


export default router;