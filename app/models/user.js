const mongoose=require('mongoose');
const { schema } = require('./menu');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"customers"}},
    {timestamps:true})

 module.exports=mongoose.model("User",userSchema);