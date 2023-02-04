//^ Importing the mongoose library to use the mongodb
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user        : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
      timestamps: true,
    }
)

//^ Creating the product schema
const productSchema = new mongoose.Schema(
{
    user        : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name        : { type: String, required: true,},
    image       : {type: String,required: true,},
    brand       : { type: String, required: true,},
    category    : { type: String, required: true,},
    description : { type: String, required: true,},
    rating      : { type: Number, required: true, default: 0},
    numReviews  : { type: Number, required: true, default: 0},
    price       : { type: Number, required: true, default: 0,},
    countInStock: {type: Number,required: true,default: 0,},
    reviews: [reviewSchema]
},{ timestamps: true, }
);


//^ Exporting the model Product created using the above schema
module.exports = mongoose.model('Product', productSchema);