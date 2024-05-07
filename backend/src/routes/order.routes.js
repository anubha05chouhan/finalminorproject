import authUser from '../middlewares/userAuth.middleware.js';
import authAdmin from '../middlewares/adminAuth.middleware.js';
import { Router } from 'express';
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/order.controller.js';

const router = Router();

// User operations
router.route('/order/add').post(authUser, addOrder);
router.route('/order/delete/:orderId').delete(authUser, deleteOrder);
router.route('/order/all').get(authAdmin, getAllOrders);
router.route('/order/:orderId').get(authUser, getOrderById);

export default router;
