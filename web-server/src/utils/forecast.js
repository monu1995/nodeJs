const request= require('request')

const forecast=(latitude,longitude,callback)=>{
  const url ='https://api.darksky.net/forecast/7e3f32edf6b6aa36c5e4fbd811fab619/'+latitude+','+longitude+'?units=si'
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to location',undefined)
    }else if(body.error){
      callback('Invalid location input',undefined)
    }else{
      const{temperature,precipProbability,cloudCover,visibility}=body.currently
      callback(undefined,'It is currently '+temperature +' degrees out. There is a '+ precipProbability +'% chance of rain with cloud cover of '+cloudCover+' and visibility will be '+visibility+'.');
    }
  })
}

module.exports=forecast