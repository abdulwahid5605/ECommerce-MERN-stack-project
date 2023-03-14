const mongoose=require ("mongoose")

// creating product schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        // we are adding the curly backets because we have to add more then one functionality of product
        // we are initializing require because name should be given. If the name is not given then we will return a message
        require:[true,"Please enter product name"],
        trim:true
    },

    description:
    {
        type:String,
        required:[true,"Please enter product description"]
    },

    price:
    {
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"Price can not exceed 8 figures"]
    },

    rating:{
        type:Number,
        // by default rating will be zero
        default:0,
    },

    // Image requires 2 thing public id and image url
    // we will get the public id of the image through cloudnary
    // in cloudnary we host the images
    // we will upload multiple images so [] these brackets are added that shows array of image
    image:
    [
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],

    catagory:{
        type:String,
        required:[true,"Please enter the product catagory"]
        // we can use "enum" that will provide us limited catagories
    },

    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock can not exceed 4 figures"], //4 means 10,000
        default:1,
    },

    numberOfReviews:
    {
        type:Number,
        default:0
    },
    
    // one person can give a review multiple times thats why array is used
    reviews:
    [
        {
            name:{
                type:String,
                required:true
            },
            rating:
            {
                type:Number,
                required:true
            },
            comment:
            {
                type:String,
                // it is not neccessary that the user should comment, so we are not using required here
                // but if you want the comment on necessary basis then comment can be required
                required:true
            } 

        }
    ],

    CreatedAt:
    {
        type:Date,
        default:Date.now
    }
})
module.exports=new mongoose.model("Product",productSchema)
// now we will import it in productController file to create proucts