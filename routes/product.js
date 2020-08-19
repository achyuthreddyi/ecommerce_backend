const express = require("express")
const router = express.Router()


const { getProductById,createProduct,getEachProduct,photo,deleteProduct,updateProduct,displayAllProductLimit,getAllUniqueCategories } = require("../controllers/product")
const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { route } = require("./auth")
// const {  } = require("../controllers/category")

//all of params
router.param("userId" , getUserById);
router.param("productId" , getProductById)

// all of actual routes!
// route to create a product!
router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct)
//read route
router.get("/product/:productId",getEachProduct)
router.get("/product/photo/:productId",photo)

// delete route for a product
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct)

//update route for a product
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct)

//listing route //TODO: use the onscroll feature
router.get("/products",displayAllProductLimit)

// distinct categories
router.get("/products/categories",getAllUniqueCategories)


module.exports = router;