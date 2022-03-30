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
const PORT=5000
app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})
app.get("/api/test",()=>{
    console.log("test successful");
})
// mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true }));
// console.log(process.env.MONGO_URL);
mongoose.connect(
    "mongodb+srv://suhail:tUKwbtFEu5gZzBYA@cluster0.ohsis.mongodb.net/shop?retryWrites=true&w=majority")
    .then(()=>console.log("DB Connection successful!"))
  .catch((err)=>{
      console.log(err);
  })
 
//   const corsOpts = {
//     origin: '*',
//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE']
// };
app.use(cors());

app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/checkout", stripeRoute)



