const express= require('express')
const mongoose=require('mongoose')
const dotenv= require('dotenv')
const connectDB= require('./config/db')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session =require('express-session')
const MongoStore= require('connect-mongo')(session)
const bodyParser = require('body-parser');
const cors = require('cors');
//below sort of front end but we dont need that
const exphds= require('express-handlebars')




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

//adding the handlebars middleware for the front end(we wont need it)
app.engine('.hbs',exphds({defaultlayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs')


//Express Session Middleware
app.use(session({
    secret:'Looking Good this backEnd',
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection})

}))


//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//folder for static content
app.use(express.static(path.join(__dirname,'public')))

// Registering Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))




//setting up Ports
const PORT= process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)