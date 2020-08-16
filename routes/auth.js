const express = require("express")
const router = express.Router()
const { check } = require('express-validator');

const { signout,signup,signin,isSignedIn,deleteme } = require('../controllers/auth')

// import { Router } from "express";
router.get("/delete",deleteme)

//sign up the new user
router.post("/signup", [
    check("name","name should be atleast three characters!").isLength({ min: 3 }),
    check("email","proper email is required").isEmail(),
    check("password","password should be at least 3 characters").isLength({ min : 3 }),
    // TODO: check if email already exists in the database
    // check("email","email already in use").findByEmail(req.body.email)
],signup);

// signin  the user
router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({ min : 3 })  
],signin)

//sign out route
router.get("/signout",signout)




module.exports = router;