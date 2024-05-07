import Order from '../models/Order.model.js';
import asyncHandler from '../utilities/asyncHandler.js';
import apiResponse from '../utilities/apiResponse.js';
import errorHandler from '../utilities/errorHandler.js';

// Add a new order
const addOrder = asyncHandler(async (req, res) => {
  const { foodItemId, quantity } = req.body;
  if (!foodItemId || !quantity) {
    throw new errorHandler(400, 'Food item ID and quantity are required');
  }

  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const order = new Order({
    foodItemId,
    quantity,
    userId,
  });

  const savedOrder = await order.save();
  if (!savedOrder) {
    throw new errorHandler(500, 'Failed to add order');
  }

  res.status(201).json(new apiResponse(200, savedOrder, 'Order added successfully'));
});

// Delete an order
const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) {
    throw new errorHandler(400, 'Order ID is required');
  }

  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const deletedOrder = await Order.findOneAndDelete({ _id: orderId, userId });
  if (!deletedOrder) {
    throw new errorHandler(404, 'Order not found');
  }

  res.status(200).json(new apiResponse(200, deletedOrder, 'Order deleted successfully'));
});

// Get all orders for a user
const getAllOrders = asyncHandler(async (req, res) => {
  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const orders = await Order.find({ userId });
  if (!orders || orders.length === 0) {
    throw new errorHandler(404, 'No orders found');
  }

  res.status(200).json(new apiResponse(200, orders, 'Successfully listed orders'));
});

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) {
    throw new errorHandler(400, 'Order ID is required');
  }

  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) {
    throw new errorHandler(404, 'Order not found');
  }

  res.status(200).json(new apiResponse(200, order, 'Successfully retrieved order'));
});

export {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
};
