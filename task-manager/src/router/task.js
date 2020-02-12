const express = require("express");
require("../db/mongoose");
const Task = require("../model/task");
const auth=require('../middleware/auth')
const router = new express.Router();

//CREATE

router.post("/user/tasks",auth, async (req, res) => {
  // const task = new Task(req.body);
  const task=new Task({
    ...req.body,
    'owner':req.user._id
  })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//READ

router.get("/user/tasks",auth, async (req, res) => {
  try { 
    // const tasks = await Task.find({owner:req.user._id});
    // res.send(tasks);
    const match={}
    const sort={}
    
    if(req.query.completed){
      match.completed=req.query.completed==='true'
    }

    if(req.query.sortBy){
      const parts=req.query.sortBy.split(':')
      sort[parts[0]]=parts[1]==='desc'?-1:1
    }

    await req.user.populate({
      path:'tasks',
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
       
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/user/tasks/:id",auth,async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({_id,owner:req.user._id});
    if (!task) {
      return res.status(404).send("task Not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//UPDATE

router.patch("/user/tasks/:id",auth,  async (req, res) => {
  const updateField = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdates = updateField.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdates) {
    return res.status(404).send("Invalid Updates");
  }
  try {
    const task =await Task.findOne({_id:req.params.id,owner:req.user._id})
    // const task=await Task.findByIdAndUpdate(req.params.id)
    
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   isValidUpdates: true
    // });
    if (!task) {
      return res.status(404).send("Invalid task");
    }
    updateField.forEach(update => task[update]=req.body[update]);
    task.save()
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETE

router.delete("/user/tasks/:id",auth, async (req, res) => {
  try {
    // const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if (!task) {
      return res.status(404).send("Invalid Task");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
