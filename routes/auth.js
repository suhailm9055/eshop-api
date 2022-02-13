const User = require("../models/User");

const router = require("express").Router();

const CryptoJS = require("crypto-js");

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
        !user && res.status(401).json("User not found")

        const hashedPassword= CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRT)
        const OGpassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        OGpassword !== req.body.password && res.status(401).json("Wrong Password!")
        const{password,...other} =user._doc;
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    } 
})

module.exports = router;
