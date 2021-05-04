const express=require("express");
const app=express();
const hbs=require('hbs');
const port=process.env.PORT || 3000
const path=require('path')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,"/resources/views/"))
app.use(express.static('public'))
app.get('/',(req,res)=>{
    // res.send("Hello from server")
    res.render('home')
})
app.listen(port,()=>{
console.log(`Listening on ${port}`);
})