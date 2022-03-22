const express = require("express");
const app= express();
const mongoose= require("mongoose")

const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe")
const cors =require("cors")



const dotenv = require("dotenv");
dotenv.config();
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is running on port 5000...");
})
app.get("/api/test",()=>{
    console.log("test successful");
})
// mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true }));
// console.log(process.env.MONGO_URL);
mongoose.connect(
    process.env.MONGO_URL)
    .then(()=>console.log("DB Connection successful!"))
  .catch((err)=>{
      console.log(err);
  })
  app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/checkout", stripeRoute)



