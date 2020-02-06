const express = require('express')
const chalk=require('chalk')
const path=require('path')
const hbs = require('hbs')

const app=express();

// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates')
const partialPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:'Manoranjan kumar'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Manoranjan kumar'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    help:'You can search for help',
    title:'Help',
    name:'Manoranjan kumar'
  })
})



app.get('/weather',(req,res)=>{
  res.send({
    forecast:'Forecast',
    location:'location'
  })
})

app.get('/help/*',(req,res)=>{
  res.render('helpError',{
    title:'Help Error',
    name:'Manoranjan',
    errorMessage:'Help article not found'
  })
})

app.get('*',(req,res)=>{
  res.render('404error',{
    title:'404',
    name:'Manoranjan',
    errorMessage:'Page Not Found'
  })
})

app.listen(3001,()=>{
  console.log(chalk.magenta('Server is up on port : '+chalk.yellow( 3001)))
})