const mongoose = require('mongoose');

const  usermodel =  new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email: {
         type : String,
         required : true
    },
    password : {
        type : String,
        required : true
    }
});

 module.exports  = mongoose.model('usermodel', usermodel);