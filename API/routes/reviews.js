import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import reviewCtrl from "./../controllers/reviewController.js"
import verify from '../middlewares/checkToken.js';


const router = Router();
router.use(asyncRoute(verify.general));


router.route('/').post(asyncRoute(reviewCtrl.createReview));
router.route('/').get(asyncRoute(reviewCtrl.getReviews));
router.route('/:id').get(asyncRoute(reviewCtrl.getReview));

export default router;