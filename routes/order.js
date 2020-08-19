const express = require("express");
const router = express.Router();
const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/auth");
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product")

const { getOrderById,createNewOrder } = require("../controllers/order")

//router params
router.param("userId",getUserById)
router.param("orderId", getOrderById)

// actual routes
// create
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createNewOrder)

// read

module.exports = router;