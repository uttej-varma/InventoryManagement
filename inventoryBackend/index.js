const express=require("express");
const app=express();
const conn=require("./databaseConnection/connect");
const cors=require("cors")
conn();
//const reglog=require("./routes/registerlogin");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const tokenVerification=require("./verifyToken/verify");
const env=require("dotenv");
env.config();
const productRouters = require("./routers/Products");
const brandsRouter = require('./routers/Brands');
const categoryRouter = require('./routers/Categories');
const authRouter = require("./routers/Auth");
const userRouter = require("./routers/User")
app.use(cors());

app.get("/api/v1/check",(req,res)=>{
   res.status(200).json({
    msg:"user ok"
   })
})

app.use("/products",(req,res,next)=>{tokenVerification(req,res,next);},productRouters.router);
app.use("/brands", (req,res,next)=>{tokenVerification(req,res,next);}, brandsRouter.router);
app.use("/categories",(req,res,next)=>{tokenVerification(req,res,next);}, categoryRouter.router);
app.use("/users", (req,res,next)=>{tokenVerification(req,res,next);}, userRouter.router);
app.use("/auth", authRouter.router);




app.listen(3400,()=>{console.log("server is up at 3400")});