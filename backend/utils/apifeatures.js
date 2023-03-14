// this file is made to provide the website ability to search,filter
class ApiFeatures {
    constructor(query, queryStr) {
        // this is a property or value
        // querystr is the keyword that the user will search
        // query is Product.find() property of getProductDetails
        this.query = query;
        this.queryStr = queryStr;

        // now we are making the search feature of the website

    }

    search() {
        // ternary operatior is used to check either the keyword is found or not

        // this.queryStr.keyword contains the word "samosa"
        const keyword = this.queryStr.keyword ? {
            // to find the name we will be using "regex", "regular expression"
            // regex is a mongodb operator
            name: {
                $regex: this.queryStr.keyword,
                // what is "i"?
                // it is case in sensitive that does not care either the word is in uppercase or lowercase. It will provide the output in both the cases i.e: ABC or abc
                $options: "i"
            }
        } : {};

        // console.log(keyword)

        // this.query=Product.find()
        // it is returning the keyword that we have made in this.queryStr
        this.query = this.query.find({ ...keyword })
        return this;
    }

    // after search we are making filter
    // making copy of "queryStr"
    // we can't make the copy directly, for copy we will use spread operator


    // function of filter: Its main function is to remove the keyword from an array consisting of keyword and catagory

    // the final result should consist only catagory
    // this is our catagory filter

    // we can not use this filter for price because we have to give the exact price for the prooduct to be found but prices will be searched in range 
    filter()
    {
        // in this line we have passed the reference not the value of queryStr
        // const queryCopy=this.queryStr
        const queryCopy={...this.queryStr}
        // console.log(queryCopy)
        // removing some of the fields
        const removeFields=["keyword","page","limit"]
        removeFields.forEach((key)=>delete queryCopy[key])

        // Price and Rating filter
        // we have to convert "gt" and "lt" (greater then and less than) in string because it is a object and we have to place a dollar in it as well
        // { price: { gt: '1200', lt: '2000' } }
        console.log(queryCopy)

        // converted to string
        let queryStr=JSON.stringify(queryCopy)
        // replacing or initialuzing dollar to make it a mongodb operator
        // inside b we have write the thing that needs to be changed
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

        // now again converting it into object

        // using the find method again to view products

        // instead of this we will be passing now the below one 
        // this.query=this.query.find(queryCopy)

        this.query=this.query.find(JSON.parse(queryStr))
        console.log(queryStr)

        return this
    }

    pagination(resultPerPage)
    {
        const currentPage=Number(this.queryStr.page) || 1
        const skip=resultPerPage*(currentPage-1)
        this.query=this.query.limit(resultPerPage).skip(skip)
        return this 
    }
}

module.exports = ApiFeatures