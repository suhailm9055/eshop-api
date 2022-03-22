const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username:{type:String,unique:true},
  email:{type:String,unique:true},
  password:{type:String,},
  mobile:{type:Number},
  isAdmin:{
      type:Boolean,default:false,
  },
  firstname:{type:String},
  Lastname:{type:String},
  img:{type:String},
  googleId:{type:String}
},{timestamps:true});

module.exports = mongoose.model('User',userSchema)
