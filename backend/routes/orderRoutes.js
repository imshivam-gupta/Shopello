//^ Using the router function provided by express to create the routes
const express = require('express');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/').post(protect,addOrderItems).get(protect,isAdmin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)


//^ Exporting the router 
module.exports = router