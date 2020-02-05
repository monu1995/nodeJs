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
const notes=require('./notes.js')

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
  handler(argv){
    notes.addNotes(argv.title,argv.body)
  }
})

// create Remove command
yargs.command({
  command:'remove',
  describe:'Remove a note',
  builder:{
    title:{
      describe:'Note title',
      demandOption:true,
      type:'string'
    }
  },
  handler(argv){
    notes.removeNotes(argv.title)
  }
})

// create List command
yargs.command({
  command:'list',
  describe:'List a note',
  handler(argv){
    notes.listNotes()
  }
})

// create Read command
yargs.command({
  command:'read',
  describe:'Read a note',
  builder:{
    title:{
      describe:'Read Title',
      demandOption:true,
      type:'string'
    }
  },
  handler(argv){
    notes.readNotes(argv.title)
  }
})

yargs.parse()
// console.log(yargs.argv)