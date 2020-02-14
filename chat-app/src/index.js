const express = require("express");
const chalk = require("chalk");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter=require('bad-words')
const {generateMessage,generateLocationMessage}=require('./utils/message')
const {addUser,removeUser,getUser,getUsersInRoom}=require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

// io.on('connection',(socket)=>{
//   console.log('New Websocket connection')
//   socket.emit('countUpdated',count)

//   socket.on('increment',()=>{
//     count++
//     io.emit('countUpdated',count)
//   })
// })

// io.on('connection',(message)=>{
//   console.log('New Websocket connection')
//   message.emit('greetings','Welcome!')
// })

io.on("connection", socket => {
  console.log("New Websocket connection");

  
  

  socket.on('join',({username,room},callback)=>{

    const {error,user}=addUser({id:socket.id,username,room})

    if(error){
      return callback(error)
    }

    socket.join(user.room)
    socket.emit('message',generateMessage('Welcome!'))
    socket.broadcast.to(user.room).emit('message',generateMessage(`${user.username} has joined`))
  })

  socket.on("sendMessage", (message,callback) => {

    const user=getUser(socket.id)
    // if(user===undefined){
    //   return callback('Something went wrong')
    // }
    
    const filter=new Filter()
    if(filter.isProfane(message)){
      return callback('Profanity is not allowed')
    }
    io.to(user.room).emit("message", generateMessage(user.username,message));
    callback()
    
  });

  socket.on("disconnect",()=>{
    const user=removeUser(socket.id)
    
    if(user){
      io.to(user.room).emit('message',generateMessage(`${user.username} has left`) )
    }
  })

  socket.on('sendLocation',(userLocation,callback)=>{
    const location=`https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`
    const user=getUser(socket.id)
    socket.to(user.room).emit('locationMessage',generateLocationMessage(user.username,location))
    callback('client acknowledge server ')
  })
});

app.get("", (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log(chalk.magenta("Server is up on port :"), port);
});
