const express = require("express")
const path = require("path");
const layout = require('express-ejs-layouts')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session)
const i18n = require("i18n-express");
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // sessiya muddati 1 kun
  },
  store: store,
  }));

  app.locals.moment = require('moment')


app.use(cookieParser());
app.use(cors());

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["uz", "ru"],
  textsVarName: 'translation'
}));

// Layout and ejs
app.use(layout)
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use( express.json() )


// Routes EJS
app.use('/', require('./routes/index'))
app.use('/', require('./routes/profile'))
app.use('/', require('./routes/videos'))


//  Router Backend
app.use('/auth' , require('./routes/auth'));
app.use('/comment' , require('./routes/comment'));
app.use('/users' , require('./routes/users'));
app.use('/slider' , require('./routes/slider'));
app.use('/janr' , require('./routes/janr'));
app.use('/onejanr' , require('./routes/onejanr'));
app.use('/category' , require('./routes/categories'));
app.use('/member' , require('./routes/member'));
app.use('/kino' , require('./routes/kino'));
app.use('/season' , require('./routes/season'));
app.use('/news' , require('./routes/news'));
app.use('/anotatsiya' , require('./routes/anotatsiya'));
app.use('/seriyaComment', require('./routes/commentSerial'));
app.use('/rate' , require('./routes/rating'));
app.use('/ratingSeason' , require('./routes/ratingSeason'));
app.use('/balance' , require('./routes/balance'));
app.use('/payment' , require('./routes/payment'));
app.use('/pricelist', require('./routes/priceList'));
app.use('/search' , require('./routes/search'));


app.use('/' , require('./routes/404'));


// Port
const PORT = 2000
app.listen(PORT, ()=> {
    console.log(`Server run ${PORT}`);
})