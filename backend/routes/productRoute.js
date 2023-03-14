// routers and routes are created using express

const express=require("express")
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controller/productController")

const router=express.Router()

// now we will import the function from productController file
router.route("/product").get(getAllProducts) //get request imported , tested on postman

router.route("/products/new").post(createProduct) //post request to create the products

// put request(update operation)
router.route("/product/:id").put(updateProduct)

// delete request
router.route("/product/:id").delete(deleteProduct)

// get request api to find out only only one product
router.route("/product/:id").get(getProductDetails)


module.exports=router
