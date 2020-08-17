const express = require("express")
const router = express.Router()
const { getCategoryById,createCategory ,getEachCategory,getAllCategory,updateCategory,deleteCategory } = require("../controllers/category")
const { getUserById, } = require("../controllers/user")
const { isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")

// params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById )

// creating the category route
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin ,
    createCategory)
//read routes
router.get("/category/:categoryId",getEachCategory)
router.get("/category/allcategories",getAllCategory)

// update route
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin ,
    updateCategory)

//delete the route
router.delete(
    "category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
)


module.exports = router