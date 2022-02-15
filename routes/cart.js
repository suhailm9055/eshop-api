const Cart = require("../models/Cart");
const {
    varifyToken,
  varifyTokenAndAuthorization,
  varifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//CREATE cart
router.post("/",varifyToken,async (req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//update
router.put("/update/:id", varifyTokenAndAuthorization, async (req, res) => {
  
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/delete/:id", varifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});


//get
router.get("/details/:id",varifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findone({userId:req.params.id});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//getAllcart
router.get("/all",varifyTokenAndAdmin,async (req,res)=>{
try{
    const carts = await Cart.find();
    res.status(200).json(carts)
}catch(err){
    res.status(500).json(err)
}
})

module.exports = router;
