const doWorkPromise=new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve([2,3,4])
    reject('this is my Error')
    
  },2000)
})

doWorkPromise.then((result)=>{
  console.log(result);
}).catch((Error)=>{
  console.log('Error',Error)
})