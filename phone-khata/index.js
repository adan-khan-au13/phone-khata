//importing all the base modules
const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 8000
const database = require('./config/database.connection')
const customerRouter = require('./routes/customers.js')
const userRouter = require('./routes/user')

//load env variables
dotenv.config(
    { 
        path: "./config/config.env" 
    }
);

//Initializing the express module
let app = express();


// Database Connection
database.authenticate()
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log("Error in connecting to Database and error is " + err))


//bodyParser.urlencoded() will accept the form data from the postman
app.use(bodyParser.urlencoded({extended:false}))

//bodyParser.json() will accept the json data from the postman
app.use(bodyParser.json())

//importing user realted route
app.use('/api/v1/users' , userRouter)

//importing customer related route
app.use('/api/v1/customer' , customerRouter)

//setting the server port for listening
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})

module.exports = app