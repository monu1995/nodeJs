// const fs=require('fs');

// fs.writeFileSync('notes.txt','Hii manoranjan Kumar')
  
// fs.appendFileSync('./notes.txt',' You are awesome')
//  const getNotes= require('./notes')

//  const notes=getNotes('Your notes ...')
//  console.log(notes)
 
// const getNotes=require('./notes')
// const notes=getNotes();
// console.log(notes);


// const validator = require('validator')

// console.log(validator.isEmail('mano@example.com'));

// const chalk=require('chalk')
// console.log(chalk.blue.bold.inverse('Success!'));

const yargs= require('yargs');

yargs.version('1.1.0')

// create Add command
yargs.command({
  command:'add',
  describe:'Add a note',
  builder:{
    title:{
      describe:'Note title',
      demandOption:true,
      type:'string'
    },
    body:{
      describe:'Note body',
      demandOption:true,
      type:'string'
    }
  },
  handler:function(argv){
    console.log('Title:',argv.title)
    console.log('Body:',argv.body)
  }
})

// create Remove command
yargs.command({
  command:'remove',
  describe:'Remove a note',
  handler:function(){
    console.log('Removing the note')
  }
})

// create List command
yargs.command({
  command:'list',
  describe:'List a note',
  handler:function(){
    console.log('Listing the note')
  }
})

// create Read command
yargs.command({
  command:'read',
  describe:'Read a note',
  handler:function(){
    console.log('Reading the note')
  }
})

yargs.parse()
// console.log(yargs.argv)