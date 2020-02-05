// const getNotes= function(notes){
//   return notes
// }
// module.exports=getNotes;
const chalk=require('chalk')
const fs = require('fs')

const getNotes=()=>'Your Notes'

/**
 * Add Notes
 */
const addNotes =(title,body)=>{
  const notes=loadNotes()
  const duplicateNotes=notes.find((note)=> note.title===title)

  debugger

  if(!duplicateNotes){
    notes.push({
      title:title,
      body:body
    })
    
    saveNotes(notes)
    console.log(chalk.green('New Note Addded'))
  } else{
    console.log(chalk.red('Note title taken'));
  }
  
}

const saveNotes=(notes)=>{
  const dataJson=JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJson)
}

const loadNotes=()=>{
  try{
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJson=dataBuffer.toString()    
    return JSON.parse(dataJson)
  }catch(e){
    return[]
  }
}

/**
 * Remove Notes
 */
  const removeNotes=(title)=>{
    const notes=loadNotes()
    const searchTitle=notes.findIndex((note)=> note.title===title)
    if (searchTitle===-1){
      console.log(chalk.red.inverse('Title not found'))
    }else{
      const removeData=notes.splice(searchTitle,1)
      console.log(chalk.green.inverse(`Data Removed`))
      saveNotes(notes)
    }
  }

/**
 * List Notes
 */

 const listNotes=()=>{
  const data=loadNotes()
  console.log(chalk.yellow('- "Your Notes"'))
  data.forEach(note => {
    console.log(note.title);
  });
 }

/**
 * Read Notes
 */
 const readNotes=(title)=>{
   const notes=loadNotes()
   const searchTitle=notes.find((note)=>note.title===title)
   
   if(!searchTitle){
    console.log(chalk.red.inverse('Title Not found'));
   }
   else{
       console.log(chalk.magenta.underline.italic(searchTitle.title)+' - '+searchTitle.body)
   }
 }

module.exports={
  getNotes:getNotes,
  addNotes:addNotes,
  removeNotes:removeNotes,
  listNotes:listNotes,
  readNotes:readNotes
}
