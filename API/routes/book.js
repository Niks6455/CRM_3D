import { Router } from 'express';
import bookCtrl from '../controllers/bookController.js';
import { asyncRoute } from '../utils/errors.js';
import verify from '../middlewares/checkToken.js';

const router = Router();

router.route('/').post(asyncRoute(verify.general),asyncRoute(bookCtrl.create));
router.route('/').get(asyncRoute(verify.general),asyncRoute(bookCtrl.getAll));
router.route('/getOne').get(asyncRoute(verify.general),asyncRoute(bookCtrl.getOne));
router.route('/delete/:id').delete(asyncRoute(verify.general),asyncRoute(bookCtrl.delete));

export default router;