import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import orderCtrl from "./../controllers/orderController.js"
import verify from '../middlewares/checkToken.js';


const router = Router();
router.use(asyncRoute(verify.general));


router.route('/').post(asyncRoute(orderCtrl.createOrder));
router.route('/').get(asyncRoute(orderCtrl.getOrders));
router.route('/:id').get(asyncRoute(orderCtrl.getOrderById));

export default router;