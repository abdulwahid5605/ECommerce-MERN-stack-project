const { json } = require("body-parser");
const express=require("express");

// importing middleware for message and statuscode
const errorMiddleware=require("./middleware/error") 

const app=express();

// a middleware to read data
app.use(express.json())

// route imports-yahan saray route import hongay
const product=require("./routes/productRoute")

const user=require("./routes/userRoutes")

// /api/v1-it is the string that will always be used
// product-it is consisting the string "/products" and a get request
// it is our first get request tha will return the message:"route is working fine"
// tested in postman
app.use("/api/v1",product)

app.use("/api/v1",user)

// middleware for error
app.use(errorMiddleware)

module.exports=app;