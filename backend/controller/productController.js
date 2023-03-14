// importing mongoose schema and model from models folder
const Product = require("../models/productModels")

// it is a class having two parameters statuscode and message
const ErrorHander = require("../utils/errorHander")

// use of promise and catch async errors
const catchAsyncError = require("../middleware/catchAsyncError")

const ApiFeature=require("../utils/apifeatures")

// query & querystr=>the search feature baby

// we are making an api "get single product" that can be used to get the details of only one product

// we use catch to overcome async errors
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    // to make this product smaller we will be using ErrorHandler
    // if(!product)
    // {
    //     res.status(500).json({
    //         success:false,
    //         message:"product not found"
    //     })
    // }

    if (!product) {
        // next is just a call back function
        return next(new ErrorHander("product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
        // productCount
    })
})

// Deleting product api
// --------Admin Route---------
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        // next is just a call back function
        return next(new ErrorHander("product not found", 404))
    }
    await Product.remove()
    res.status(200).json({
        success: true,
        message: "product is deleted successfully"
    })
})



// Updating product api
// -----------ADMIN ROUTE--------
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    // firstly find the product
    let product = await Product.findById(req.params.id)

    // if product not found
    if (!product) {
        // next is just a call back function
        return next(new ErrorHander("product not found", 404))
    }

    // if product is founded update it
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidation: true, useFindAndModify: false })

    res.status(200).json({
        success: true,
        product
    })
})

// Creating Product
// -----------ADMIN ROUTE---------
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body)

    // server 201 shows the created request
    res.status(201).json({
        success: true,
        product
    })
})


// we will be making the apis in productController file
// call back function
// it is a get request
// we will find all of the products through this route
exports.getAllProducts = catchAsyncError(async (req, res) => {
    
    const resultPerPage=5

    // method-1:to send values to query & querystr
    // ApiFeatures(Product.find(),req.query.keyword)

    // method-2:to send values to query & querystr
    // req.query(samosa) is passed to the keyword variable in ApiFeature constructor
    
    const apiFeature = new ApiFeature(Product.find(),req.query).search().filter().pagination(resultPerPage)
    //.search is the search function that we have created in apiFeature file 

    // const products = await Product.find()
    // now we can't use Product.find() again So we are using the class of apiFeature again here
    const products=await apiFeature.query;  


    // const products = await Product.find({name:"samosa"})
    // we can find the product using the above method but it is simply application for the exact name "samosa" not for "newsamosa", because of this reason we are making a class to solve this issue
    
    
    res.status(200).json({
        // message:"Route is working fine"
        success: true,
        products
    })
})