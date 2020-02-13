const express = require("express");
const chalk = require("chalk");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT;


const multer=require('multer')
const upload=multer({
  dest:'Images'
})

app.post('/upload',upload.single('upload'),(req,res)=>{
  res.send()
})


app.listen(port, () => {
  console.log(chalk.magenta("Server is up on port : " + chalk.yellow(port)));
});

// const User=require('./model/user')
// const Task=require('./model/task')

const main=async()=>{
  // const task=await Task.findById('5e439de188797123897be8fc')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner);

  // const user=await User.findById('5e4395485e333a2006c17372')
  // await user.populate('tasks').execPopulate()
  // console.log(user.tasks)
  
}

main()
