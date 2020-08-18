const Category = require("../models/category")

exports.getCategoryById = (req,res,next, id) =>{    
    // FIXME: this will act as middleware
    Category.findById(id).exec((err , category) =>{
        if(err){
            return res.status(400).json({
                error: "Category not found in DB",
                err
            })
        }
        req.category = category; 
        next();
    })      
}

exports.createCategory = (req,res) =>{
    const category = new Category(req.body)
    category.save((error,category) =>{
        if(error){
            return res.status(400).json({
                error:"Category not been saved in the database"
            })
        }
        res.json({category})
    })
}
exports.getEachCategory=(req,res) =>{
    return res.json(req.category)
}

exports.getAllCategory = (req,res) =>{
    // getting all the categories
    Category.find().exec((error,categories) =>{
        if(error){
            console.log('error',error);
            return res.status(400).json({
                error: "Category  yu not found in DB"
            })
        }
        res.json(categories)
    })

};


exports.updateCategory = (req,res) =>{
    // TODO: getting from the middleware from the above params
    const category = req.category
    category.name = req.body.name; // getting from the frontend or teh postman

    category.save(( err,updatedCategory ) =>{
        if(err){
            return res.status(400).json({
                error:"FAILED TO UPDATE THE CATEGORY!!"
            })
        }
        res.json(updatedCategory)
    })
}

exports.deleteCategory = (req,res) =>{
    const category = req.category;
    category.remove( (error,category) =>{
        if(error){
            return res.status(400).json({
                error:"deletion operation unsuccesfful"
            })
        }
        res.json({
            message: "category is deleted successfully!!"
        })
    })

}