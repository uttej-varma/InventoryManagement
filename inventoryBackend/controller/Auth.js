const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const env=require("dotenv");
env.config();
exports.createUser = async (req, res) => {
  //todo: password hash
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (!checkUser) {
        const {email,password}=req.body;
        bcrypt.hash(password, 10,async function(err, hash) {
         if(err)
         {
            return res.status(500).json({
                 status:"failed",
                 message:err.message
             })
         }
         const dataafterhash=await User.create({
             email,
             password:hash,
         })
         res.status(201).json({
             message:"registered successfully"  
         })
     });
    } else {
      res.status(401).json({
        message: "user already exist",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

exports.checkAuth = async (req, res) => {
   if(req.user){
    res.json(req.user);
   }
   else{
    res.sendStatus(401);
   }
};

exports.loginUser = async (req, res) => {
    try{
       
        const {email,password}=req.body;
    const user= await User.findOne({email});
    //if user is not present in database...
    if(!user)
    {
        return res.status(400).json({
            status:"failed",
            message:"user should register"
        }) 
    }
   //if user is present we are checking weather the credentials are matching and generating web token accordingly...
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                return res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }
            if(result){
                const token=jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),// 1 hour
                    data: {id:user._id,role:user.role}
                  }, process.env.SECRET);
                return res.status(200).json({
                    status:"success",
                    message:"user logged in",
                    id:user._id,
                    token,
                    role:user.role
                })
            }
            else{
                res.status(400).json({
                    status:"failed",
                    message:"invalid credentials"
                })
            }
        });
    
    }
    catch(e){
         res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
};


