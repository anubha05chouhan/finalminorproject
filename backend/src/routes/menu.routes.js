import authAdmin from '../middlewares/adminAuth.middleware.js';
import { Router } from 'express';
import {
  addFoodItemToMenu,
  deleteFoodItemFromMenu,
} from '../controllers/menu.controller.js';

const router = Router();

// Admin operations
router.route('/menu/addItem').post(authAdmin, addFoodItemToMenu);
router.route('/menu/deleteItem').delete(authAdmin, deleteFoodItemFromMenu);

export default router;
