const express = require("express")
const dotenv = require('dotenv');
const path = require("path");
const layout = require('express-ejs-layouts')
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session)
const app = express()



const MongoURI = "mongodb://localhost:27017/amedia_test"
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then((res) => {
    console.log('MongoDB Connected');
  })
 
const store = new MongoDBSession({
  uri: MongoURI,
  collection: "MYSession"
})
app.use(session({
    secret: 'my_secret_key_124536798',
    saveUninitialized: false,
    store: store,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // sessiya muddati 1 kun
      sameSite: 'strict'
    }
  }));



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
app.use('/slider' , require('./routes/users'));


// Port
const PORT = 2000
app.listen(PORT, ()=> {
    console.log(`Server run ${PORT}`);
})