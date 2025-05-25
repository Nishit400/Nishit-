import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    require:[true,"Name is Required"]
  },
  email:{
    type:String,
    require:[true,"Email is Required"],
    unique:[true,"Email Already Exist"]
  },
  password:{
    type:String,
    require:[true,"Password is required"],
    minLength : [6,"Password should be more than 6 character"]
  },
  address:{
    type:String,
    require:[true,"Address is required"]
  },
  city:{
    type:String,
    require:[true,"City is required"]
  },
  country:{
    type:String,
    require:[true,"Country is required"]
  },
  phone:{
    type:String,
    require:[true,"Phone No. is required"]
  }
},
{timestamps:true});


//hash function
userSchema.pre("save",async function(){
  this.password = await bcrypt.hash(this.password,10)
})

//compare function
userSchema.methods.comparePassword = async function(plainPassword){
  return await bcrypt.compare(plainPassword, this.password)
}

//JWT Token
userSchema.methods.generateToken = async function(){
  return JWT.sign({_id:this._id},process.env.JWT_SECRET, {
    expiresIn: "7d"
  })

}


const userModel = mongoose.model("users",userSchema)

export default userModel