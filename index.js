const express = require("express");
const app= express();
const mongoose= require("mongoose")

const userRoute = require("./routes/user")
const dotenv = require("dotenv");
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




app.listen(5000,()=>{
    console.log("Server is running...");
})