const express = require("express")
const router = express.Router()

const { getUserById,getUser,updateUser,userPurchaseList }  = require('../controllers/user')
const { isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')

// getting the single user
router.param("userId",getUserById)
// TODO: how is it different from how you used to follow ??
router.get("/user/:userId",isSignedIn,isAuthenticated, getUser)

//updating the user information
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)

// router.get("/users" , getAllUsers)

module.exports = router;