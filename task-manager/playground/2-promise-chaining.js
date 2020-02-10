require('../src/db/mongoose')
const Task=require('../src/model/task')

// Task.findByIdAndDelete('5e414dcd96799b45862ee0fd').then((task)=>{
//   console.log(task)
//   return Task.countDocuments({completed:false})
// }).then((result)=>{
//   console.log('second Chaining',result)
// }).catch((e)=>{
//   console.log(e)
// })

const searchAndDelete=async(id,completed)=>{
  const task= await Task.findByIdAndDelete(id)
  const count= await Task.countDocuments({completed})
  return count
}

searchAndDelete('5e41288c54fe742bfd3905fb',false).then((result)=>{
  console.log("count=",result)
}).catch((e)=>{
  console.log(e)
})