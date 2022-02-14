const User = require("../models/User");
const { varifyTokenAndAuthorization, varifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//update
router.put("/:id", varifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRT
    ).toString();
  }
  try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set :req.body  
    },{new:true})
    const {password,...other} = updatedUser._doc;
    res.status(200).json(other);  
  }catch (err){
      res.status(500).json(err)
  }
});

//delete
router.delete("/:id",varifyTokenAndAdmin,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted.")
    }catch (err){
        res.status(500).json(err)
    }
})
//get
router.delete("/:id",varifyTokenAndAdmin,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted.")
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;
