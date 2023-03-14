const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');
const UserSchema=new Schema({
    Username:{
        type:String,
        required:[true,"Username is required"],
        unique:true
    },
    Email:{
        type:String,
        required:[true,"Email is Required"]
    },
    Password:{
        type:String,
        required:[true,"Password is Required"]
    }

})
UserSchema.pre('save',function(next){
    const user=this;
    bcrypt.hash(user.Password,5,(err,hash)=>{
        if(!err)
        {
            user.Password=hash
            next()
        }
    })
})

const User=mongoose.model("User",UserSchema)
module.exports=User;