const express = require("express")
const router = express.Router()


const { getProductById,createProduct,getEachProduct,photo } = require("../controllers/product")
const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { route } = require("./auth")
// const {  } = require("../controllers/category")

//all of params
router.param("userId" , getUserById);
router.param("productId" , getProductById)

// all of actual routes!
// route to crate a route!
router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct)

router.get("/product/:productId",getEachProduct)
router.get("/product/photo/:productId",photo)


module.exports = router