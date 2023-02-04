const asyncHandler=require('express-async-handler')
const Product = require('../models/productModel')


exports.getProducts = asyncHandler(async(req,res)=>{
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1 
    const keyword = req.query.keyword?{
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {}

    const count = await Product.count({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    res.json({products,page,pages: Math.ceil(count/pageSize)})
})

exports.getProductById = asyncHandler(async(req,res)=>{
    const prod = await Product.findById(req.params.id)
    if(prod) return res.json(prod)
    else res.status(404).json({'message' :'Product Not Found'})
})

exports.deleteProduct = asyncHandler(async(req,res)=>{
    const prod = await Product.findById(req.params.id)
    if(prod) {
        await prod.remove()
        res.json({message:'Product Removed'})
    }
    else res.status(404).json({'message' :'Product Not Found'})
})


exports.createProduct = asyncHandler(async(req,res)=>{
    // console.log('yaha to aaya hi tha')
    const product = new Product({
        user:req.user.id,
        name:'Sample Name',
        image: 'images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        description: 'Sample Description'
    })
    
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    // console.clear()
})


exports.updateProduct = asyncHandler(async(req,res)=>{
    
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body
    
      const product = await Product.findById(req.params.id)
    
      if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
    
        const updatedProduct = await product.save()
        res.json(updatedProduct)
      } else {
        res.status(404)
        throw new Error('Product not found')
      }
    })



exports.createProductReview = asyncHandler(async(req,res)=>{
    
    const {
        rating,comment
    } = req.body
    
    const product = await Product.findById(req.params.id)
    
    if (product) {

        const alreadyReviewd = product.reviews.find(r=> r.user.toString() === req.user._id.toString())

        if(alreadyReviewd)
        {
            res.status(400)
            throw new Error('Product Already Reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review)

        product.numReviews= product.reviews.length
        product.rating= product.reviews.reduce((acc,item)=> item.rating+acc,0)/product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review Added'})



      } else {
        res.status(404)
        throw new Error('Product not found')
      }
    })


exports.getTopProducts = asyncHandler(async(req,res)=>
    {
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products)
    }
)