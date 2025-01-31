import { Router } from 'express';
import bookCaseCtrl from '../controllers/bookCaseController.js';
import { asyncRoute } from '../utils/errors.js';
import verify from '../middlewares/checkToken.js';

const router = Router();

router.route('/').post(asyncRoute(verify.general),asyncRoute(bookCaseCtrl.create));
router.route('/').get(asyncRoute(verify.general),asyncRoute(bookCaseCtrl.getAll));

export default router;