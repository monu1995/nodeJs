const express = require("express");
require("../db/mongoose");
const User = require("../model/user");
const auth = require("../middleware/auth");

const router = new express.Router();

//CREATE

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Login

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Logout

router.post('/users/logout',auth,async(req,res)=>{
  try{
    req.user.tokens=req.user.tokens.filter((token)=>{
      return token.token!==req.token
    })
    await req.user.save()
    res.send()
  }catch(e){
    res.status(500).send()
  }
})

router.post('/users/logoutall',auth,async(req,res)=>{
  const tokenArray=req.user.tokens
  // console.log(tokenArray.length);
  
  try{
    req.user.tokens=tokenArray.splice(0,tokenArray.length)
    console.log('++++++++++++++',req.user.tokens)
    await req.user.save()
    res.send()
  }catch(e){
    res.status(500).send()
  }
})

//READ

router.get("/users/me", auth, async (req, res) => {

  /**
   * We dont want to see all user details by any user.
   */

  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send(e);
  // }
  res.send(req.user)
});

router.get("/users/:id", async (req, res) => {
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

//UPDATE

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidUpdates = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdates) {
    return res.status(400).send("Invalid Updates");
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    if (!user) {
      return res.status(404).send("Invalid User");
    }
    res.send(user);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//DELETE

router.delete("/users/:id", async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    if (!userDeleted) {
      return res.status(404).send("Invalid User");
    }
    res.send(userDeleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
