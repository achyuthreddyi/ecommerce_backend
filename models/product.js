const mongoose = require("mongoose")
const Schema , { ObjectId } = mongoose.Schema;


const productSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        maxlength:2000
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    category:{
        type : ObjectId,
        ref:"Category",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type: Number,
        default:0
    },
    photo:{
        // FIXME: image is stored in the databse update back to the standard principle
        type:Buffer,
        contentType:String
    }

    // TODO: size of the tshirts and work on the same
} , { timestamps : true })

module.exports = mongoose.model("Product",productSchema)