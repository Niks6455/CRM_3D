import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
// import verify from '../middlewares/verify-token.js';
import uploadsCtrl from '../controllers/uploadController.js';

const router = Router();

// router.use(asyncRoute(verify.general));


router
    .route('/')
    .post(uploadsCtrl.uploader, asyncRoute(uploadsCtrl.uploadFile))

export default router;