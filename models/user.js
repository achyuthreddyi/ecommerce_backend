const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    lastname : {
        type : String,
        maxlength: 32,
        trim : true
    },
    email :{
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    userinfo : {
        type: String,
        trim : true
    },
    //  TODO come back here
    password : {
        type: String,
        trim : true
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchases : {
        type: Array,
        default : []
    },
    
})


module.exports = mongoose.model("User" , userSchema);