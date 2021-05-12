const express = require("express");
const app = express();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();
const session = require('express-session');
const expressLayout=require('express-ejs-layouts');
const port = process.env.PORT || 3300;
const mongoose=require('mongoose');
const flash=require('express-flash');
const MongoDbStore =require('connect-mongo')(session);

const url='mongodb://localhost:27017/pizza-app';
mongoose.connect(url, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify: false,
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Database is connected");
}).catch((err) =>{
    console.log("connection failed");
})
// storing session in database
const mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection: 'session'
});

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie:{maxAge: 1000 * 60 *24*24 } // 24 hours
}));

// global middelware to set session in response local
app.use((req,res,next)=>{
    res.locals.session=req.session;
    next()
})

app.use(express.json())
app.use(flash());
app.use(expressLayout);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/resources/views/"));



// require for all routes
const routes = require('./routes/web');

routes(app);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})