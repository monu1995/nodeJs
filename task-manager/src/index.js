const express = require("express");
const chalk = require("chalk");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3002;



app.listen(port, () => {
  console.log(chalk.magenta("Server is up on port : " + chalk.yellow(port)));
});
