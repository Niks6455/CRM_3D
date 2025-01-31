import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import favoritesCtrl from "./../controllers/FavoritesController.js"
import verify from '../middlewares/checkToken.js';


const router = Router();
router.use(asyncRoute(verify.general));


router.route('/').post(asyncRoute(favoritesCtrl.addFavorite));
router.route('/').get(asyncRoute(favoritesCtrl.getFavorites));
router.route('/:id').delete(asyncRoute(favoritesCtrl.removeFavorite));

export default router;