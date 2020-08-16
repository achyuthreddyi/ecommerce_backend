const User = require ('../models/user')
const { validationResult } = require('express-validator');
// const { request } = require('express');
// const { param } = require('../routes/auth');


exports.signup = (req,res) =>{

    const errors = validationResult(req)
    // FIXME: how will this requse be populated ??

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param:errors.array()[0].param
        })            
    }    

    const user = new User(req.body)
    user.save( (err,user) =>{
        if(err) {
            return res.status(400).json({
            err: "not able to save user in the database"
        })
    }
    res.json({
        name: user.name,
        email:user.email,
        id:user._id
    })
    } )
    
}


exports.signout = (req,res) =>{
    res.json({
        message:"usersignout"
    })
}

  