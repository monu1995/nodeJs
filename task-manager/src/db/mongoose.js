const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
})



// const me=new User({
//   name:'      Monu Kumar      ',
//   age:22,
//   email:'MONU111@GMAIL.COM',
//   password:'phone123    '
// })

// me.save().then((result)=>{
//   console.log(result)
// }).catch((error)=>{
//   console.log(error)
// })

// const work=new Task({
//   description:'           Previous concept clear       ' ,
//   completed:true
// })

// work.save().then((result)=>{
//   console.log(result)
// }).catch((error)=>{
//   console.log('Error',error)
// })
