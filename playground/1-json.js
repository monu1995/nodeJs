const fs = require('fs');

const bufferData=fs.readFileSync('1-json.json');
const dataString=bufferData.toString();
// const dataJson=JSON.stringify(dataString)
const dataParse=JSON.parse(dataString)



dataParse.name='Manoranjan Kumar'
dataParse.age=22

const userJson=JSON.stringify(dataParse)
fs.writeFileSync('1-json.json',userJson)

console.log(userJson);