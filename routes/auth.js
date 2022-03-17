const User = require("../models/User");

const router = require("express").Router();

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken")

//register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRT
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
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

module.exports = router;
