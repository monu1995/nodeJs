const mongoose = require("mongoose");
const validator = require("validator");
const bycript=require('bcryptjs');
const jwt=require('jsonwebtoken')
const Task =require('./task')

const userSchema=mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw Error("You cannot add negative age");
      }
    }
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
    unique:true
  },

  password: {
    type: String,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password should not contain "password"');
      }
    },
    required: true
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
  avatar:{
    type:Buffer
  }
},{
  timestamps:true
})

userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

userSchema.methods.toJSON=function(){
  const user =this
  const userObject=user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.methods.generateAuthToken= async function(){
  const user=this
  const token=jwt.sign({_id:user._id.toString()},'thisismycourse')

  user.tokens=user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
  const user=await User.findOne({email})

  if(!email){
    throw new Error('Unable to Login')
  }


  const isMatch=await bycript.compare(password,user.password)

  if(!isMatch){
    throw new Error('Wrong Password')
  }

  return user
}

userSchema.pre('save',async function(next){
  const user =this

  if(user.isModified('password')){
    user.password=await bycript.hash(user.password,8)
  }

  next()
})

userSchema.pre('remove',async function(next){
  const user =this
  await Task.deleteMany({owner:user._id})
  next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;
