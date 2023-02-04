const mongoose = require('mongoose');
const dotenv = require('dotenv')
mongoose.set("strictQuery",false);

dotenv.config()

const connectDB = async () => {
    try{ 
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db.");
    } 
    catch (err){
        console.log(err);
    }
};

module.exports=connectDB
