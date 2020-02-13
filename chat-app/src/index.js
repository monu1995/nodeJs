const express = require("express");
const chalk = require("chalk");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

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

  socket.emit('message','Welcome!')
  socket.broadcast.emit('message','A new user has joined')

  socket.on("sendMessage", message => {
    io.emit("message", message);
  });

  socket.on("disconnect",()=>{
    io.emit('message','A user has left')
  })
});

app.get("", (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log(chalk.magenta("Server is up on port :"), port);
});
