const Order = require("../models/Order");
const {
    varifyToken,
  varifyTokenAndAuthorization,
  varifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//CREATE cart
router.post("/",varifyToken,async (req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

//update
router.put("/update/:id",varifyTokenAndAdmin, async (req, res) => {
  
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete user order
router.delete("/delete/:id", varifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});


//get user order
router.get("/details/:id",varifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({userId:req.params.id});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
//getAllcart
router.get("/all",varifyTokenAndAdmin,async (req,res)=>{
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find().sort({ _id: -1 }).limit(5)
      : await Order.find();
    res.status(200).json(orders)
}catch(err){
    res.status(500).json(err)
}
});

// get monthly income
router.get("/income",varifyTokenAndAdmin,async (req,res)=>{
const date= new Date();
const lastMonth = new Date(date.setMonth(date.getMonth()-1));
const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

try{
const income = await Order.aggregate([
    {$match:{createdAt:{$gte:previousMonth}}},
    {$project:{
        month:{$month:"$createdAt"},
        sales:"$amount",
    },
},
{
$group:{
    _id:"$month",
    total:{$sum:"$sales"}
},
},
])
res.status(200).json(income)
}catch(err){
    res.status(500).json(err)
}
});

module.exports = router;
