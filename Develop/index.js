const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util=require("util");

const writeFileAsync = util.promisify(fs.writeFile);


const htmler = function generateHTML(data) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${data.username}</title>
</head>
<body>
</body>
</html>`
}


const userInput = ()=>{
   return inquirer.prompt([
       {
         type:"input",
         message: "Enter your GitHub username",
         name: "username"
        },
    {
        type:"input",
        messege: "What is your favorite color?",
        name: "color"

    }]).then(function(data){
        console.log(data)
     }) 
    
    }
//var result = userInput().then(console.log(result));



//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}`;
//     axios
//   .get(queryUrl)
//   .then(function(data) {
//       const html = generateHTML(data);
//       fs.writeFile("index.html", html )
    
//   });
// });
//{username} = name;

async function init() {
    try {
        const data = await userInput();
        const html = await generateHTML(data);
       const write = await writeFileAsync("index.html", html);
        //turn into seperate function, run with an await
        
       // const queryUrl = await `https://api.github.com/users/${data.username}`;
        
       // axios.get(queryUrl);
        
        
    }catch (err) {
        console.log(err);
      } 
    }
    
        init();





// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();
