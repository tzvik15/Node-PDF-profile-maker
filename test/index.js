const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util=require("util");

const generateHTML = require("../Develop/generateHTML")

const writeFileAsync = util.promisify(fs.writeFile);


//let html = "";
let img = "";
let location = "";
let gitProfile = "";
let userBlog = "";
let userBio = "";
let repoNum = 0;
let followers = 0;
let following = 0;
let starNum = 0;
let color="";
let username="tzvik15";

const userInput = function(){
  return inquirer.prompt([
       {
         type:"input",
         message: "Enter your GitHub username",
         name: "username"
        },
    {
        type:"input",
        message: "Do you prefer green/red/pink/blue?",
        name: "color"

    }])
    // .then(function(){
    //     username=data.username;
    //     color=data.color;
    //     console.log(username, data);
   // })
    // .then(function(response){
    //     username = response.username;
    //     color = response.color;
    // })
}

    const axing =function(username) {
             const config = { headers: { accept: "application/json" } };
             let queryUrl =  "https://api.github.com/users/"+username
             return axios.get(queryUrl, config)
    .then(function(res){
        
        
          img = res.data.avatar_url;
          location = res.data.location;
         gitProfile = res.data.html_url;
          userBlog = res.data.blog;
         userBio = res.data.bio;
          repoNum = res.data.public_repos;
          followers = res.data.followers;
          following = res.data.following;
    })
//if this doesn't work as is, make this a seperate function


    // .then(()=>{
    //   let newUrl = `https://api.github.com/users/${username}/starred`
    //   axios.get(newUrl, config)
    //   .then(res=>{
    //     starNum = res.data.length;
    //   //  console.log(img, gitProfile)
    //   })
    // });
}
     



async function init() {
    try {
        
         const data = await userInput();
        // console.log(data);
         
         const data2 = await axing();
         const html = await generateHTML(data);
        // const test = axing(username);
       //  const html2 = await axiosCall();
         await writeFileAsync("index.html", html);
         console.log(gitProfile);
       //  await writeFileAsync("index2.html", JSON.stringify(test));
        
    }catch (err) {
        console.log(err);
      } 
    }
    
init()


