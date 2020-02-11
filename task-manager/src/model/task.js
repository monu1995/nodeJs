const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
  description:{
    type:String,
    required:true,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  }
})

taskSchema.pre('save',function(next){
  const task=this
  if(task.isModified()){
    console.log('Middleware for task'); 
  }
  next()
})

const Task=mongoose.model('task',taskSchema)

module.exports=Task