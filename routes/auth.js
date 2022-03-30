const User = require("../models/User");

const router = require("express").Router();

const dotenv = require("dotenv");
dotenv.config();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const accountSid="ACa2ed5db7008d57d616de72fa92439d65";
const authToken="7b9208e7a3e3f1dc709b2c6ada5b6188";
const client = require('twilio')(accountSid,authToken);
//register

router.post("/register", async (req, res) => { 

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRT
    ).toString();
  }
  const newUser = new User(req.body);
  

  try {
    const savedUser = await newUser.save(); 
    console.log(savedUser)
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
}); 

//login

router.post("/login", async (req,res)=>{
    try{
        const user =await User.findOne({username:req.body.username});
        if(!user ) return (res.status(401).json("User not found"))

        const hashedPassword= CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRT)
        const OGpassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        
        if(OGpassword !== req.body.password) return (  res.status(401).json("Wrong Password!"))
        
        const accessToken= jwt.sign({
            id:user.id,isAdmin:user.isAdmin,
        },
        process.env.JWT_KEY,{expiresIn:"3d"}
        )
        
        const{password,...other} =user._doc; 
        res.status(200).json({...other,accessToken})
    }catch(err){
        res.status(500).json(err)
    } 
})
 
// OTP LOGIN 

router.post("/login/mobile",async (req,res)=>{
  const number = req.body.mobile;
  const Ssid=process.env.Ssid;

  console.log(number);
  console.log(Ssid);
  
try{

  client.verify.services(Ssid).verifications.create({
    to:`+91${number}`,
    channel:"sms"
  }).then((response)=>{
    res.status(200).json(response)
    // console.log(response);
  })
}catch(err){
  console.log(err);

  res.status(500).json("mobile error") 
}



})
router.post("/login/otp",async (req,res)=>{
  const number = req.body.mobile;
  const otp = req.body.otp;
  const Ssid=process.env.Ssid; 

  

if(otp){
  client.verify.services(Ssid).verificationChecks.create({to: `+91${number}`, code: `${otp}`})
  .then((response)=>{ 
    res.status(200).json(response)
    console.log("otp",response);

  })
}else{ 
  res.status(500).json("otp error")

}
 
})

module.exports = router; 
