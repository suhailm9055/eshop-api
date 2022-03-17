const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  email:{type:String,required:true,unique:true},
  password:{type:String},
  phone:{type:Number,required:true},
  isAdmin:{
      type:Boolean,default:false,
  },
  fullname:{type:String,required:true},
  img:{type:String},
},{timestamps:true});

module.exports = mongoose.model('User',userSchema)
