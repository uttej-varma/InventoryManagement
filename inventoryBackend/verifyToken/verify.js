const jwt=require("jsonwebtoken");
const Verify=(req,res,next)=>{
    const token=req.headers.jwttoken;
    if(token)
    {
        jwt.verify(token,process.env.SECRET, function(err, decoded) {
            //if token is expired....
           if(err){
            return res.status(400).json({
                message:"please login again"
            })
           }
           
           req.user=decoded.data;
           
         
           next();
          });
    }
    else{
        //if no token is present in headers;
        res.status(400).json({
            message:"user not authenticated"
        })
    }
}
module.exports=Verify;