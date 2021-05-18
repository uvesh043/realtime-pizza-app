const express = require("express");
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayout=require('express-ejs-layouts');
require('dotenv').config();
const session = require('express-session');
const port = process.env.PORT || 3300;
const mongoose=require('mongoose');
const flash=require('express-flash');
const MongoDbStore =require('connect-mongo')(session); //use to store session in database
const passport=require('passport'); //require passport npm for authentication

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
    resave: false, //The resave field forces the session to be saved back to the session store
    store: mongoStore, 
    saveUninitialized: false, //saveUninitialized field forces a session that is “uninitialized” to be saved to the store.
    cookie:{maxAge: 1000 * 60 *24*24 } // 24 hours
}));

//config passport(passport npm library used for easy login)
const passportInit=require('./app/config/passportConfig')
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json())
app.use(flash());
app.use(expressLayout);
app.use(express.urlencoded({extended:false})) //Express.urlencoded() expects request data to be sent encoded in the URL, usually in strings or arrays:
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, "/resources/views/"));

// global middelware to set session in response local(this type of middelware run every time)
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.user;  // The res.locals property is an object that contains response local variables scoped to the request and because of this, it is only available to the view(s) rendered during that request/response cycle (if any).
    next()
})

// require for all routes
const routes = require('./routes/web');

routes(app);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})