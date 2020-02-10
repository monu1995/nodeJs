// const mongodb=require('mongodb');

// const MongoClient=mongodb.MongoClient
const {MongoClient,ObjectID} =require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,data)=>{
  if(error){
   return console.log(error)
  }
  const db=data.db(databaseName)

  // db.collection('user').insertOne({
  //   name:'Ujjwal Kumar',
  //   age:25
  // },(error,result)=>{
  //   if(error){
  //     return console.log(error)
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('user').insertMany([
  //   {
  //     name:'ram',
  //     age:24
  //   },
  //   {
  //     name:'shyam',
  //     age:25
  //   },
  //   {
  //     name:'kalu',
  //     age:25
  //   },
  // ],(error,result)=>{
  //   if(error){
  //     return console.log('Unable to insert document')
  //   }
  //   console.log(result.ops)
    
  // })

  // db.collection('task').insertMany([
  //   {
  //     description:'this is task for crud',
  //     completed:false
  //   },
  //   {
  //     description:'understand the basic',
  //     completed:true
  //   },
  //   {
  //     description:'inserted many data',
  //     completed:true
  //   },
  // ])

  // db.collection('user').findOne({name:'Ujjwal Kumar'},(error,data)=>{
  //   if(error){
  //     return console.log("Error happend");
  //   }
  //   console.log(data)
  // })

  // db.collection('user').find({age:25}).toArray((error,data)=>{
  //   if(error){
  //     return console.log("Error happend");
  //   }
  //   console.log(data)
  // })

  // db.collection('user').find({age:25}).count((error,data)=>{
  //   if(error){
  //     return console.log("Error happend");
  //   }
  //   console.log(data)
  // })

  // db.collection('task').findOne({_id:new ObjectID("5e3d6d6f0ab00169e14210c2")},(error,data)=>{
  //   if(error){
  //     return console.log("unable to fetch")
  //   }
  //   console.log( data)
    
  // })

  // db.collection('task').find({completed:true}).toArray((error,data)=>{
  //   console.log(data)
  // })

  // db.collection('user').updateOne({
  //   _id: new ObjectID('5e3d657aad84ca669508be20')
  // },{
  //   $set:{
  //     name:'Monu'
  //   }
  // }).then((result)=>{
  //   console.log(result)
  // }).catch((error)=>{
  //   console.log(error)
  // })

  // db.collection('task').updateMany({
  //   completed:false
  // },{
  //   $set:{
  //     completed:true
  //   }
  // }).then((result)=>{
  //   console.log(result.modifiedCount)
  // }).catch((error)=>{
  //   console.log(error)
  // })

  // db.collection('user').deleteMany({
  //   age:25
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error)
  // })

  db.collection('task').deleteOne({
    description:'inserted many data'
  }).then((result)=>{
    console.log(result)
  }).catch((error)=>{error})
})
