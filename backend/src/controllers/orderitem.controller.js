import OrderItem from '../models/OrderItem.model.js';
import asyncHandler from '../utilities/asyncHandler.js';
import apiResponse from '../utilities/apiResponse.js';
import errorHandler from '../utilities/errorHandler.js';

// Add a new order item
const addOrderItem = asyncHandler(async (req, res) => {
  const { foodItemId, quantity } = req.body;
  if (!foodItemId || !quantity) {
    throw new errorHandler(400, 'Food item ID and quantity are required');
  }

  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const orderItem = new OrderItem({
    foodItemId,
    quantity,
    userId,
  });

  const savedOrderItem = await orderItem.save();
  if (!savedOrderItem) {
    throw new errorHandler(500, 'Failed to add order item');
  }

  res.status(201).json(new apiResponse(200, savedOrderItem, 'Order item added successfully'));
});

// Delete an order item
const deleteOrderItem = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) {
    throw new errorHandler(400, 'Order item ID is required');
  }

  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const deletedOrderItem = await OrderItem.findOneAndDelete({ _id: orderId, userId });
  if (!deletedOrderItem) {
    throw new errorHandler(404, 'Order item not found');
  }

  res.status(200).json(new apiResponse(200, deletedOrderItem, 'Order item deleted successfully'));
});

// Get all order items for a user
const getAllOrderItems = asyncHandler(async (req, res) => {
  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const orderItems = await OrderItem.find({ userId });
  if (!orderItems || orderItems.length === 0) {
    throw new errorHandler(404, 'No order items found');
  }

  res.status(200).json(new apiResponse(200, orderItems, 'Successfully listed order items'));
});

// Get order item by ID
const getOrderItemById = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) {
    throw new errorHandler(400, 'Order item ID is required');
  }

  // Assuming you have a user ID available in req.user._id after authentication
  const userId = req.user._id;

  const orderItem = await OrderItem.findOne({ _id: orderId, userId });
  if (!orderItem) {
    throw new errorHandler(404, 'Order item not found');
  }

  res.status(200).json(new apiResponse(200, orderItem, 'Successfully retrieved order item'));
});

export {
  addOrderItem,
  deleteOrderItem,
  getAllOrderItems,
  getOrderItemById,
};
