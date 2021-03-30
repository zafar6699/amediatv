const express = require("express")
const dotenv = require('dotenv');

// const path = require('path').join(__dirname, '/public')
const path = require("path");
const layout = require('express-ejs-layouts')
const morgan = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
// Load env vars
dotenv.config({path : './config/config.env'})

// Connect DB
connectDB();


const app = express()


app.use(cookieParser());
app.use(cors({ rogin : "*" }));
// Dev logging middlewares
if(process.env.NODE_ENV === 'developer'){
    app.use(morgan('dev'));
}

// Layout and ejs
app.use(layout)
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use( express.json() )

// Routes EJS
app.use('/', require('./routes/index'))
app.use('/', require('./routes/profile'))
app.use('/', require('./routes/videos'))


//  Router Backend
app.use('/auth' , require('./routes/auth'));
app.use('/users' , require('./routes/users'));


// Port
const PORT = 2000
app.listen(PORT, ()=> {
    console.log(`Server run ${PORT}`);
})