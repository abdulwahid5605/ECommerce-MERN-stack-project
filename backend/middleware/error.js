// importing ErrorHander from utils folder
const ErrorHander=require("../utils/errorHander")
// why we have declared statuscode and message in this file
//status code and message are two variable that are already created in ErrorHander file.
module.exports=(err,req,res,next)=>
{
    err.statusCode=err.statusCode || 500;
    err.message=err.message|| "internal server error"

    // wrong Mongodb id error "Cast error"
    if(err.name==="CastError")
    {
        const message=`Resorce not found. Invalid ${err.path}`;
        // 400 statuscode=bad request
        err=new ErrorHander(message,400)
    }

    // now we will pass statuscode and message to response
    res.status(err.statusCode).json({
        success:false,
        // err.stack gives us the complete path of directory
        // error:err.stack
        // it will provide 404 error
        error:err,
        // it will provide "product not fouund"
        // message:err.message

    }) 
}

// now we will import this function in app.js file