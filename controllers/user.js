const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user) =>{
        if(err || !user ) {
            return res.status(400).json({
                error:"USER NOT FOUND IN THE DATABASE!!!"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req,res) =>{
    // TODO: getback here for the password!!    
    req.profile.salt = undefined
    req.profile.encrypted_password= undefined
    req.profile.createdAt= undefined
    req.profile.updatedAt=undefined
    return res.json(req.profile)
}

exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        // TODO: apply the datavalidation methodologies
        {_id: req.profile._id},
        {$set: req.body},
        {new : true, useFindAndModify:false},
        (err,user) =>{
            if(err){
                return res.status(400).json({
                    error:"YOU ARE NOT ALLOWED TO UPDATE THE DATABASE"
                })
            }
            user.salt = undefined
            user.encrypted_password= undefined
            user.createdAt= undefined
            user.updatedAt=undefined 
            res.json(user)
        }
        )   
}

exports.userPurchaseList = (req,res) =>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order) =>{
        if(err){
            return res.status(400).json({
                error:"NO ORDER IN THIS ACCOUNT"
            })
        }
        return res.json(order);
    })    
}

//TODO: NEVER FORGET THIS IS A MIDDLEWARE
exports.pushOrderInPurchaseList = (req,res,next)=>{
    // FIXME: come back here and revise this shit
    let purchases = []
    // FIXME: just imagind something is coming frm the frontend as the product and 
    // we are updating the same here
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            // TODO: note that the total calculated amount should also be coming from the frontend
            transaction_id:req.body.order.transaction_id
        })        
    });
    //  store this in the database
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push: {purchases : purchases}},
        {new:true},
        (err , purchases) =>{
            if(err){
                return res.status(400).json({
                    error:"UNABLE TO SAVE PURCHASE LIST"
                })
            }
            next();
        }
    )    
 };


















// exports.getAllUsers = (req,res) =>{
//     User.find().exec((err , users) => {
//         if(err || !users){
//             return res.status(400).json({
//                 error:"NO USERS FOUND IN THE DATABASE"
//             })
//         }
//         res.json(users)

//     })
// }

