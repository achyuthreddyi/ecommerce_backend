const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const Product = require("../models/product")
const { sortBy } = require("lodash")


exports.getProductById = (req,res,next,id ) =>{
    Product.findById(id)
    .populate("category") //sorting based on the category!!
    .exec((error,product)=>{
        if(error){
            return res.status(422).json({
                error:"NO SUCH PRODUCT FOUND !!!"
            })
        }
        req.product = product;
        next();
    })
} 

exports.createProduct = (req,res) =>{
    // 
    console.log("coming!!!");
    let form  = new formidable.IncomingForm()
    form.keepExtensions = true;
    // FIXME:
    // FIXME: should it be try catch
    form.parse(req,(err,fields,file) =>{
        if(err){
            return res.status(400).json({
                error: "problem is with message"
            })
        }

        // destructure the data
        const { name,description,price,category,stock  } = fields

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock 
        ){
            return res.status(400).json({
                error: "PLEASE INCLUDE ALL FIELDS"
            })
        }


        // TODO: restrict on some fields just check if we can use express-validateor
        let product = new Product(fields)
        // console.log(product);
        

        // handle file here!
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size too big !!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // save to the database
        product.save((error , product) =>{
            if(error){
                return res.status(422).json({
                    error:"PRODUCT NOT SAVED IN THE DATABASE!!"
                })
            }
            res.json(product)            
        })
    })
}

exports.getEachProduct = (req,res) =>{    
    req.product.photo = undefined
    return res.json(req.product)
}
//middleware
// FIXME: come back here because we are getting the req.product.phot = undefined how will get back the things
exports.photo = (req,res,next) =>{
    if (req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
}
//  delete method
exports.deleteProduct = (req, res) =>{
    let product = req.product
    product.remove( (err,deleteProduct) =>{
        if(err){
            return res.status(422).json({
                error:"PRODUCT NOT DELETED IN THE DATABASE!!"
            })
        }
        return res.status(200).json({
            message:"PRODUCT DELETED IN THE DATABASE",
            deleteProduct
        })
    })
}

//update method
exports.updateProduct = (req, res) =>{  
    let form  = new formidable.IncomingForm()
    form.keepExtensions = true;
    // FIXME:
    // FIXME: should it be try catch
    form.parse(req,(err,fields,file) =>{
        if(err){
            return res.status(400).json({
                error: "problem is with message"
            })
        }

        // destructure the data
        const { name,description,price,category,stock  } = fields

        // if(
        //     !name ||
        //     !description ||
        //     !price ||
        //     !category ||
        //     !stock 
        // ){
        //     return res.status(400).json({
        //         error: "PLEASE INCLUDE ALL FIELDS"
        //     })
        // }


        // TODO: restrict on some fields just check if we can use express-validateor
        let product = req.product
        // console.log(product);
        // TODO: updating the stuff
        product = _.extend(product , fields )
        

        // handle file here!
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size too big !!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // save to the database
        product.save((error , product) =>{
            if(error){
                return res.status(422).json({
                    error:"UPDATED DATA NOT SAVED IN THE DATABASE!!"
                })
            }
            res.json(product)            
        })
    })

}

// get all te products with limit from he database
exports.displayAllProductLimit = (req, res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit): 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
        .select("-photo")
        .populate("category")
        .sort( [[ sortBy,"asc" ]] )
        .limit(limit)
        .exec( (error,products) =>{
            if(error) {
                return res.status(400).json({
                    error:"NO PRODUCT FOUND!!"
                })
            }
            res.json(products)
    })
}


exports.updateStock = (req,res,next) =>{
    
    let myOperations = req.body.order.products.map( product =>{
        return {
            updateOne :{
                filter:{_id:product._id},
                update:{$inc: {stock :-product.count ,sold: +product.count} }
            }
        }
    })

    Product.bulkWrite(myOperations,{},(error,products) =>{
        if(error){
            return res.status(400).json({
                message: 'bulk operations failed!!'
            })
        }
        next();
    })

}
