const { Order,ProductCart } = require("../models/order")


exports.getOrderById = (req,res,next,id ) =>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec( (error,order) =>{
        if(error){
            return res.status(400).json({
                error: "NO ORDER FOUND"
            })
        }
        req.order = order
        next();
    })
}

exports.createNewOrder = (req,res) =>{
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save( (error,order)=>{
        if(error){
            return res.status(400).json({
                error: "CANNOT CREATE ORDER"
            })
        }
        res.json(order)
    })
}

exports.getAllOrders = (req, res) =>{
    Order.find()
        .populate("user" , "_id name")
        .exec( (error,order) =>{
            if(error){
                return res.status(400).json({
                    error: "CANNOT CREATE ORDER"
                })
            }
            res.json(order)
        })
}

exports.getOrderStatus = (req,res) =>{
    res.json(Order.schema.path("status").enumValues)

}

exports.updateStatus = (req,res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set : {status : req.body.status}},
        (error,order) =>{
            if(error){
                return res.status(400).json({
                    error: "STATUS CANNOT BE UPDATED !!"
                })
            }
            res.json(order)
        } 
        )
}