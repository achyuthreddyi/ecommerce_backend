const User = require ('../models/user')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt'); 



exports.signin = (req,res) =>{
    const {email , password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param:errors.array()[0].param
        })            
    } 
    User.findOne( {email} , (err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "USER EMAIL DOES NOT EXIST!!"
            })
        }  
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password do not match "
            })            
        }
        // creating a token 
        const token = jwt.sign({_id:user._id}, process.env.SECRET)
        console.log('id',user._id);
        console.log('token',token);
        res.cookie("token",token,{expire:new Date() + 9999})
        
        // send the response to the front end!!
        const {_id , name , email , role} = user;
        return res.json({
            token,user:{
                _id,
                name,
                email, 
                role
            }
        })
    } )    
}
exports.signup = (req,res) =>{

    const errors = validationResult(req)
    // FIXME: Fixed how will this req use be populated ??

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
    res.clearCookie("token");
    res.json({
        message:"user signout successful!"
    })
}


// protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});



// custom middlewares

exports.isAuthenticated = (req,res,next) => {
    // FIXME: in the front end create a property called profile
    // auth is set from isSignedIn method from above
    // TODO: please connect back hte dots !!!
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if( !checker ){
        return res.status(403).json({
            error:"ACCESS DENIED !!!"
        })
    }  
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "YOU ARE NOT AN ADMIN !!!, ACCESS DENIED !!!"
        })
    }         
    next()
}

  