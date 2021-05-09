const express = require("express");
const app = express();
const ejs=require('ejs');
require('dotenv').config();
const session=require('express-session');
const expressLayout=require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const flash=require('express-flash');
mongoose.connect('mongodb://localhost:27017/pizza-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

}).then(() => {
    console.log("connection succesful");
}).catch((e) => {
    console.log('No conection ');
});


app.use(session({
    secret:process.env.COOKIE_SECRET, 
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24} // 24 hours
}))
const path = require('path');

app.use(flash())
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/resources/views/"));
app.use(express.static('public'));



// require for all routes
const routes = require('./routes/web');
routes(app);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})