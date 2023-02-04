//^ Using the router function provided by express to create the routes
const express = require('express');
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
 


router.post('/login',authUser)
router.post('/signup',registerUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
router.route('/').get(protect,isAdmin,getUsers)
router.route('/:id').delete(protect,isAdmin,deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser)


//^ Exporting the router 
module.exports = router