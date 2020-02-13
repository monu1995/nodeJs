const socket=io()
const messageForm=document.querySelector('form')
const inputMessage=document.querySelector('input')

// socket.on('countUpdated',(count)=>{
//   console.log('The count has been update',count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//   console.log('Clicked')
//   socket.emit('increment')
// })


socket.on('message',(recievedMessage)=>{
  console.log(recievedMessage)
})


messageForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const message=inputMessage.value
  socket.emit('sendMessage',message)
})