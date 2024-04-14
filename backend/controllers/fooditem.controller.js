import FoodItem from '../models/FoodItem.model.js'
import asyncHandler from '../utilities/asyncHandler.js'
import apiResponse from '../utilities/apiResponse.js'
import errorHandler from '../utilities/errorHandler.js'

// Add a new food item
const addFoodItem = asyncHandler(async (req, res) => {
  const { name, price, prepTime, image, rating, description, availability } = req.body
  if (!name || !price || !prepTime || !image || !rating || !description || !availability) {
    throw new errorHandler(400, 'All fields are required')
  }

  const foodItem = new FoodItem({
    name,
    price,
    prepTime,
    image,
    rating,
    description,
    availability,
  })

  const savedFoodItem = await foodItem.save()
  if (!savedFoodItem) {
    throw new errorHandler(500, 'Failed to add food item')
  }

  res.status(201).json(new apiResponse(200, savedFoodItem, 'Food item added successfully'))
})

// Delete a food item
const deleteFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId
  if (!foodItemId) {
    throw new errorHandler(400, 'Food item ID is required')
  }

  const deletedFoodItem = await FoodItem.findByIdAndDelete(foodItemId)
  if (!deletedFoodItem) {
    throw new errorHandler(404, 'Food item not found')
  }

  res.status(200).json(new apiResponse(200, deletedFoodItem, 'Food item deleted successfully'))
})

// Update a food item
const updateFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId
  if (!foodItemId) {
    throw new errorHandler(400, 'Food item ID is required')
  }

  const { name, price, prepTime, image, rating, description, availability } = req.body
  if (!name && !price && !prepTime && !image && !rating && !description && !availability) {
    throw new errorHandler(400, 'At least one field to update is required')
  }

  const updatedFields = {}
  if (name) updatedFields.name = name
  if (price) updatedFields.price = price
  if (prepTime) updatedFields.prepTime = prepTime
  if (image) updatedFields.image = image
  if (rating) updatedFields.rating = rating
  if (description) updatedFields.description = description
  if (availability) updatedFields.availability = availability

  const updatedFoodItem = await FoodItem.findByIdAndUpdate(foodItemId, updatedFields, { new: true })
  if (!updatedFoodItem) {
    throw new errorHandler(404, 'Food item not found')
  }

  res.status(200).json(new apiResponse(200, updatedFoodItem, 'Food item updated successfully'))
})

// Get all food items
const getAllFoodItems = asyncHandler(async (req, res) => {
  const foodItems = await FoodItem.find()
  if (!foodItems || foodItems.length === 0) {
    throw new errorHandler(404, 'No food items found')
  }

  res.status(200).json(new apiResponse(200, foodItems, 'Successfully listed food items'))
})

export {
  addFoodItem,
  deleteFoodItem,
  updateFoodItem,
  getAllFoodItems,
}
