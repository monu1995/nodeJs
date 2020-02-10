const express = require("express");
const chalk = require("chalk");
require("./db/mongoose");
const User = require("./model/user");
const Task = require("./model/task");

const app = express();

app.use(express.json());
const port = process.env.PORT || 3002;

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/user/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("user Not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/user/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/user/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("task Not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send({Error:e});
  }
});

app.listen(port, () => {
  console.log(chalk.magenta("Server is up on port : " + chalk.yellow(port)));
});
