const express = require("express");
require("../db/mongoose");
const Task = require("../model/task");

const router = new express.Router();

//CREATE

router.post("/user/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//READ

router.get("/user/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/user/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("task Not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//UPDATE

router.patch("/user/tasks/:id", async (req, res) => {
  const updateField = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdates = updateField.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdates) {
    return res.status(404).send("Invalid Updates");
  }
  try {
    const task=await Task.findByIdAndUpdate(req.params.id)
    updateField.forEach(update => task[update]=req.body[update]);
    task.save()
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   isValidUpdates: true
    // });
    if (!task) {
      return res.status(404).send("Invalid task");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETE

router.delete("/user/tasks/:id", async (req, res) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if (!taskDeleted) {
      return res.status(404).send("Invalid Task");
    }
    res.send(taskDeleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
