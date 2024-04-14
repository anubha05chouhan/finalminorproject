import FoodItem from '../models/FoodItem.model.js';
import authAdmin from '../middlewares/adminAuth.middleware.js';
import { Router } from 'express';
import {
  addFoodItem,
  deleteFoodItem,
  updateFoodItem,
  getAllFoodItems,
} from '../controllers/fooditem.controller.js';

const router = Router();

// Admin operations
router.route('/fooditem/add').post(authAdmin, addFoodItem);
router.route('/fooditem/delete/:foodItemId').delete(authAdmin, deleteFoodItem);
router.route('/fooditem/update/:foodItemId').put(authAdmin, updateFoodItem);
router.route('/fooditem/all').get(authAdmin, getAllFoodItems);

export default router;
