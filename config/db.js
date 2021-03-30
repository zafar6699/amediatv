const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/amedia_test'

const connectDB = async () => {
   await mongoose.connect(url , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
     })
     console.log(`MongoDB connected`)
}
 
 module.exports = connectDB;
