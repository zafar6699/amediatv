const express = require("express")

const path = require("path");
const layout = require('express-ejs-layouts')
const app = express()

// Layout and ejs
app.use(layout)
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use( express.json() )

// Routes 
app.use('/', require('./routes/index'))
app.use('/api', require('./routes/profile'))

app.use('/api', require('./routes/videos'))

// Port
const PORT = 2000
app.listen(PORT, ()=> {
    console.log(`Server run ${PORT}`);
})