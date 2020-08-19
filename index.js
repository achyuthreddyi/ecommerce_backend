require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
// defining all the routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

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
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes)



//port
const port = process.env.PORT || 8000;

app.listen(port , ()=> {
    console.log(`app is running at ${port}`)
})

