const path= require('path')
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { normalize } = require('path')

var slugify = require('slugify')


let destination = 'uploads/';


const storageEngine = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, normalize(destination))
    },
    
    filename: (req, file, cb) => {
        const filename = slugify(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(filename)}`);
    },

});

function checkFileType(file,cb){
    const filename = slugify(file.originalname)
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    
    //check extension names
    const extName = fileTypes.test(path.extname(filename).toLowerCase());
    
    const mimeType = fileTypes.test(file.mimetype);
    
    if (mimeType && extName) {
    return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
}
}


const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },

});

router.post('/',upload.single('image'),(req,res)=>{
    console.log(`${req.file.path}`)
    res.send(`${req.file.path}`)
})


//^ Exporting the router 
module.exports = router