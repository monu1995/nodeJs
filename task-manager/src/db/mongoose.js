const mongoose=require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
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
