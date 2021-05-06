const express = require("express");
const { registerPartial } = require("hbs");
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000
const path = require('path')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "/resources/views/"))
app.use(express.static('public'))
//register parials folder
const partialsPath = path.join(__dirname, '/resources/views/partials')
hbs.registerPartials(partialsPath);
app.get('/', (req, res) => {
    // res.send("Hello from server")
    res.render('home')
})
app.get('/cart', (req, res) => {
    res.render('customers/cart')
})
app.get('/login',(req,res)=>{
    res.render('auth/login')
})
app.get('/register',(req,res)=>{
    res.render('auth/register')
})
app.listen(port, () => {
    console.log(`Listening on ${port}`);
})