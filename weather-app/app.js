const request = require('request');

const url ='https://api.darksky.net/forecast/7e3f32edf6b6aa36c5e4fbd811fab619/37.8267,-122.4233'
const geoCodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibW9udTE5a3IiLCJhIjoiY2s2OWJ0YnRvMGU5cjNucWplaWllY3pmZyJ9.Z9qgvyonwu8A7oJ-ICTp-Q&limit=1'

// request({url:url,json:true},(error,response)=>{ 
//   if (error){
//     console.log(error);
//   }else if(response.body.error){
//     console.log('Unable To find')
//   }else{
//     console.log('It is currently '+ response.body.currently.temperature +' degrees out. There is a '+ response.body.currently.precipProbability +'% chance of rain.');
//   }
//   })

// Geocoding

request({url:geoCodeURL,json:true},(error,response)=>{
  if (error){
    console.log(error)
  }
  else if(response.body.features.length===0){
    console.log('Place not exist')
  }
  else{
    const longitude=response.body.features[0].center[0]
    const latitude= response.body.features[0].center[1]
    console.log('Longitude : '+longitude,'Latitude : '+latitude)
  }
})