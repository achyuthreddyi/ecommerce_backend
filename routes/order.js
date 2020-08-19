const express = require("express");
const router = express.Router();
const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/auth");
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product")

const { getOrderById,createNewOrder,getAllOrders,getOrderStatus,updateStatus } = require("../controllers/order")

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

// read the routes that has been recieved
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
)

//status of order
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
)

router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
    );

module.exports = router;