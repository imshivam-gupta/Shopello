

//^   Running the express framework 
const express  = require('express');
const app      = express();
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')

const path = require('path')


//^ For bodyparser to parese the headers
const bodyParser = require('body-parser');
app.use(bodyParser.json());


connectDB()
dotenv.config()

app.use(cors({
}))


//^ Setting up various routes that we have created
const productRoutes  = require('./routes/productRoutes.js')
const userRoutes  = require('./routes/userRoutes.js')
const orderRoutes  = require('./routes/orderRoutes.js')
const uploadRoutes  = require('./routes/uploadRoutes.js')
app.use('/api/product',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/uploads',uploadRoutes)


app.use(express.static('uploads'))



// app.use(cors());


// ^ Importing the products
// const products = require('./data/products');


//^ get request for products
// app.get('/api/products',(req,res)=>{
//     res.json(products)
// })


// //^ get request for spefici product
// app.get('/api/products/:id',(req,res)=>{
//     const product = products.find(p => p._id===req.params.id)
//     res.json(product)}
// )



const PORT = process.env.PORT || 4000
//^ Finally staring the server on port mention in environment
app.listen(PORT,  () => { console.log(`Server is running on port ${PORT}`)} )