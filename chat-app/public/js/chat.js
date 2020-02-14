const socket=io()

//Elements
const messageForm=document.querySelector('#messageForm')
const inputMessage=document.querySelector('#inputMessage')
const messageButton=document.querySelector('#messageButton')
const locationButton=document.querySelector('#location')
const messages=document.querySelector('#messages')

//Templates
const messageTemplate=document.querySelector('#message-template').innerHTML
const locationTemplate=document.querySelector('#location-template').innerHTML

//options

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})

// socket.on('countUpdated',(count)=>{
//   console.log('The count has been update',count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//   console.log('Clicked')
//   socket.emit('increment')
// })


socket.on('message',(recievedMessage)=>{
  console.log(recievedMessage)
  const html=Mustache.render(messageTemplate,{
    username:recievedMessage.username,
    message:recievedMessage.text,
    createdAt:moment(recievedMessage.createdAt).format('h:mm a')
  })

  messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(message)=>{
  console.log(message)
  const html=Mustache.render(locationTemplate,{
    username:message.username,
    url:message.text,
    createdAt:moment(message.createdAt).format('h:mm a')
  })
  messages.insertAdjacentHTML('beforeend',html)
})


messageForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const message=e.target.messageInput.value

  messageButton.setAttribute('disabled','disabled')

  socket.emit('sendMessage',message,(error)=>{

    messageButton.removeAttribute('disabled')

    if(error){
     return console.log(error);
    }
    console.log('message Was delivered to server');
    // console.log(acknowledgeFromServer);
  })
})

locationButton.addEventListener('click',()=>{
  if(!navigator.geolocation){
    return alert('device not support location service')
  }
  locationButton.setAttribute('disabled','disabled')
  navigator.geolocation.getCurrentPosition(({coords})=>{
 
    const sendLocation={
      latitude:coords.latitude,
      longitude:coords.longitude
    }
    socket.emit('sendLocation',sendLocation,(message)=>{
      locationButton.removeAttribute('disabled')
      console.log('Location Shared')
      console.log(message);
      
    })
  })
  
})

socket.emit('join',{username,room},(error)=>{
  if(error){
    alert(error)
    location.href='/'
  }
})