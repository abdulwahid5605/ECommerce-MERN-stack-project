// we are making a function to use a catch along with async
// theFunc: it is basically the complete function of async that we have used in our apis
module.exports= theFunc => (req,res,next)=>{
    // promise is already builtin class of javascript
    // if theFunc fails then we have used catch 
    Promise.resolve(theFunc(req,res,next)).catch(next)
}