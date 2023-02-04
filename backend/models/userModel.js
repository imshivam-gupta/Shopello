//^ Importing the mongoose library to use the mongodb
const mongoose = require('mongoose');


//^ Importing the bcrypt library to save our password in hashed form for security
const bcrypt   = require('bcrypt')



//^ Creating the user schema
const userSchema=new mongoose.Schema(
    {
        name         : { type: String, required: true, min:3},
        email        : { type: String, required: true, trim: true, unique:true, lowercase: true},
        hash_password: { type: String, required: true},
        isAdmin      : { type: Boolean, required:true, default: false},
        contactNo    : { type: String},
        profile_pic  : { type: String}
    },
    { 
        timestamps: true
    }
)


//^ Creating the virtual fields password and encrypting it using bcrypt library
userSchema.virtual('password').set(function(password){ this.hash_password=bcrypt.hashSync(password,12) })


//^ Creating user schema method authenticate so that we can compare given pwd and encrypted pwd
userSchema.methods.authenticate =async function(password){ 
    return await bcrypt.compare(password,this.hash_password) 
}


//^ Exporting the model User created using the above schema
module.exports = mongoose.model('User',userSchema); 