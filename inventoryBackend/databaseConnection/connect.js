const mongoose=require("mongoose");
const env=require("dotenv");
env.config();
async function connection(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('dbConnected')
}
module.exports=connection;