const express=require("express");
const cors=require("cors");
require("dotenv").config();

const pool = require("./database/db");

pool.connect()
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Database error",err)
})

const userRoute=require("./route/userRoute");
const productRoute=require("./route/productRoute");
const cartRoute=require("./route/cartRoute");
const orderRoute=require("./route/orderRoute");


const app=express();


app.use(cors());

app.use(express.json());


app.use("/uploads",
express.static("uploads"));



app.get("/",(req,res)=>{

res.send(
"Floral Bloom Backend 🌸"
)

});



app.use("/api/users",userRoute);

app.use("/api/products",productRoute);

app.use("/api/cart",cartRoute);

app.use("/api/orders",orderRoute);



app.listen(
process.env.PORT,
()=>{
console.log(
"Server running"
)
});