require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
// defining all the routes
const authRoutes = require('./routes/auth')

//middlewares
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors  = require("cors")

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//connecting the database
mongoose.connect(process.env.DATABASE, 
    {useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true})
    .then(() =>{console.log("DATABASE CONNECTED")})
    .catch( () => consloe.log("ERROR IN DATABASE CONNECTION"))

// Routes
app.use("/api", authRoutes);



//port
const port = process.env.PORT || 8000;

app.listen(port , ()=> {
    console.log(`app is running at ${port}`)
})

