const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username:{type:String,unique:true},
  email:{type:String,unique:true},
  password:{type:String,},
  mobile:{type:Number},
  isAdmin:{
      type:Boolean,default:false,
  },
  firstName:{type:String},
  lastName:{type:String},
  img:{type:String},
  googleId:{type:String},
  address:{type:String},
},{timestamps:true});

module.exports = mongoose.model('User',userSchema)
