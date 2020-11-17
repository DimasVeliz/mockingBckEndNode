const express= require('express')
const mongoose=require('mongoose')
const dotenv= require('dotenv')
const connectDB= require('./config/db')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const bodyParser = require('body-parser');
const cors = require('cors');




//load config
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)

//conecting to DataBase
connectDB()

const app= express();



//ading cors
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//loggin all request we make in development mode :)
if (process.env.NODE_ENV=='development') {
    app.use(morgan('dev'))
}



//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//folder for static content
app.use(express.static(path.join(__dirname,'public')))

// Registering Routes
app.use('/auth',require('./routes/ExternalAuthController'))
app.use('/api/authinternal', require('./routes/AuthController'));
app.use('/api/email', require('./routes/EmailController'));





//setting up Ports
const PORT= process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)