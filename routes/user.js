const User = require("../models/User");
const {
  varifyTokenAndAuthorization,
  varifyTokenAndAdmin,
} = require("./verifyToken");
var CryptoJS = require("crypto-js");

const router = require("express").Router();

//update
router.put("/update/:id", varifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRT
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...other } = updatedUser._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/delete/:id", varifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get
router.get("/userdetails/:id", varifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//getAllUsers
router.get("/", varifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(7)
      : await User.find();
    res?.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user stats
router.get("/stats", varifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/addUser", varifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRT
    ).toString();
  }
  const newUser = new User(req.body);
  try {
    const addUser = await newUser.save();
    const { password, ...other } = addUser._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
