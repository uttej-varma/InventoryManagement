const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'user'},
    imageUrl:{type:String,default:''},
    name:{type:String,default:''}
})

const virtual=userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function (doc,ret) {delete ret._id}
})

exports.User=mongoose.model('user',userSchema);