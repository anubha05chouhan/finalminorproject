import Admin from '../models/Admin.model'
import asyncHandler from '../utlities/asyncHandler.js'
import errorHandler from '../utlities/errorHandler.js'

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.body || req.header('Authorization')?.replace('Bearer ', '')
  console.log(token)
  if (!token) {
    throw new errorHandler(401, 'Unauthorised Request')
  }
  const decodedToken = jwr.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const admin = await Admin.findById(decodedToken._id).select('-password')
  if (!admin) {
    throw new errorHandler(401, 'Invalid Access Token')
  }
  req.user = admin
  next()
})

export default verifyJWT
