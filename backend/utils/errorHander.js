// in class the first letter is always capital
// ErrorHander is a built in class
// super is the "constructor" of Error class
// super will simply return the message that we will pass in above constructor
// we are using the methods of ErrorHander with the help of extended class Error


class ErrorHander extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor)
        // where this is the object
        // captureStackTrace: it provides us complete path while we are detecting an error  
    }
}
module.exports=ErrorHander;

// after this we are making another middleware