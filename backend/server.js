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
const adminRoute=require("./route/adminRoute");
const contactRoute=require("./route/contactRoute");

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

app.use("/api/admin",adminRoute);

app.use("/api/contact",contactRoute);

// 404 — unknown API route
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Centralized error handler — never leak stack traces to the client
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(
PORT,
()=>{
console.log(
`Server running on port ${PORT}`
)
});
