const express = require("express");
const app= express();
const mongoose= require("mongoose")

const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")




const dotenv = require("dotenv");
app.listen(5000,()=>{
    console.log("Server is running...");
})
dotenv.config();
app.get("/api/test",()=>{
    console.log("test successful");
})
mongoose.connect(
    process.env.MONGO_URL)
    .then(()=>console.log("DB Connection successful!"))
  .catch((err)=>{
      console.log(err);
  })
  
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)



