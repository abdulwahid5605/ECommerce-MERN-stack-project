// imported from app.js file
const app=require("./app")

// we are importing the call back function that will connect us to the mongodb
const connectDatabase=require("./config/database")


// we have installed a dotenv to recognize the variables that we are declaring in config.env file
const dotenv=require("dotenv")

// this type of error is known as uncaught errors
// uncaught error: when variable or parameter is not defined
process.on("uncaughtException",(err)=>
{
    console.log(`Error:${err.message}`)
    console.log(`Server is closed due to uncaught Exception`)
    process.exit(1)
})
// console.log(youtube)


// giving the path of config.env file

dotenv.config({path:"backend/config/config.env"})

//calling connect database
connectDatabase() 

// creating server
const server= app.listen(process.env.PORT,()=>{
    console.log(`server is working at:http://localhost:${process.env.PORT}`)
})



// what is unhandled promise rejection(error)
// when the error occur because we have committed a mistake while we are writing the address of database then it is known as unhandled promise rejection
// in unhandled promise rejection(error) the server is not crashed. We crash the server by force
// we are resolving the risk of error that may arrive due to wrong address of the mongodb server
process.on("unhandledRejection",(err)=>
{
    console.log(`Error: ${err.message}`)
    console.log(`Server is closed due to unhandled promise rejection`)

    // server is a variable consisting of locahost sever
    // server.close forcely closes the server
    server.close(()=>{
        // exit from this process
        process.exit(1)
    })
})