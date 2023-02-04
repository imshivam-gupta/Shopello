//^ Importing the jwt so that we can use it to generate signin token to autenitcate other requests
const jwt = require('jsonwebtoken');
const asyncHandler=require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');



//&   @desc      AUTH USER AND GET TOKEN
//&   @route     POST /api/users/login
//&   @access    Public 



//^ Creating the signin function for users
exports.authUser = asyncHandler(async(req,res) => {


    // res.json({email,password})
    const user = await User.findOne({email:req.body.email})
    const b = await user.authenticate(req.body.password)
    // .exec((error,user)=> {
   
    //     if(error) return res.status(400).json( { message: 'error' })
        
    if(  user  && b){
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }

    else{
        return res.status(400).json({error:"Invalid email or password"})
        // res.status(401)
        // throw new Error('Invalid email or password')
    }
        // if(   user &&   (await user.authenticate(req.body.password))    ) {
        //     // const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{ expiresIn: '1h'});
        //     // const {firstName,lastName,email,role,fullName,_id} =user;
        //     res.status(200).json({
        //         // token,
        //         name:user.name
        //     })
        // }

    //     else return res.status(400).json({message:'Something went wrong'})
        
    // })

})



//^ Creating the signup function for users
exports.registerUser = asyncHandler(async(req,res) => {

    const {name,email,password} = req.body
    const UserExists = await User.findOne({email:email})

    if(UserExists){
        res.status(401)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user)
    {
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }

    else{
        res.status(400)
        throw new Error('User Not Found')
    }
})












exports.getUserProfile = asyncHandler(async(req,res) => {
    // res.json('success')
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin}
        )
    }
    else{
        res.status(401)
        throw new Error('User Not found')
    }
})



exports.updateUserProfile = asyncHandler(async(req,res) => {
    // res.json('success')
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email= req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })


    }
    else{
        res.status(401)
        throw new Error('User Not found')
    }
})










//^ Creating the signup function for users
exports.signup = (req,res) => {

    User.findOne({email:req.body.email})
    .exec( (error,user) => {

            if(user) return res.status(400).json( { message:'User already registered'});

            const{name,email,password} = req.body;
            const _user = new User( {firstName,lastName,email,userName:Math.random().toString(),password} );

            _user.save( (error,data)=>{ 
                if(error){ return res.json({ message: error }) };

                if(data){
                        send_new_user(data);
                        return res.status(201).json( { message:"User Created Succefully" } ) 
                    }
                }
            );

        }
    )
}








exports.getUsers = asyncHandler(async(req,res) => {
    const users = await User.find({})
    res.json(users)
})


exports.deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(user){
        await user.remove();
        res.json({message: 'User removed'})
    }

    else{
        res.status(404)
        throw new Error('User not found')
    }
})

exports.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})

exports.updateUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })



