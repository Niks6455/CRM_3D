import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import productCtrl from '../controllers/productController.js';

const router = Router();



router.route('/').post(asyncRoute(productCtrl.createProduct));
router.route('/').get(asyncRoute(productCtrl.getProducts));
router.route('/:id').get(asyncRoute(productCtrl.getProduct));
router.route('/:id').post(asyncRoute(productCtrl.updateProduct));
router.route('/:id').delete(asyncRoute(productCtrl.deleteProduct));

export default router;