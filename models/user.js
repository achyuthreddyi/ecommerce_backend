const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

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
    //  TODO: password should be hashed!!
    encrypted_password : {
        type: String,
        required:true
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
    
});

userSchema.virtual("password")
    .set( function (password){
        this._password = password
        this.salt = uuidv1();
        this.encrypted_password = this.securePassword(password)
    } )
    .get( function(){
        return this._password
    })



userSchema.method = {
    
    authenticate:function (plain_password){
        return this.securePassword(plain_password) === this.encrypted_password
    },

    securePassword : function(plain_password){
        if (!plain_password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plain_password)
            .digest('hex')            
        } catch (error) {
            return "";            
        }
    }
}


module.exports = mongoose.model("User" , userSchema);