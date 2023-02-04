//^ Using the router function provided by express to create the routes
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel')

const asyncHandler = require('express-async-handler');
const { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts } = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');



router.route('/')
.get(getProducts)
.post(protect, isAdmin, createProduct)

router.get('/top',getTopProducts)

router.route('/:id/review').post(protect, createProductReview)


router.route('/:id')
.get(getProductById)
.delete(protect,isAdmin,deleteProduct)
.put(protect,isAdmin,updateProduct)




//^ Exporting the router 
module.exports = router