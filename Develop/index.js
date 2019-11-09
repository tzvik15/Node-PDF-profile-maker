const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util=require("util");

const generateHTML = require("./generateHTML")

const writeFileAsync = util.promisify(fs.writeFile);
//const html = util.promisify(generateHTML(data))

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
    .then(function({ username }) {
          color=color;
          username=username;
             const config = { headers: { accept: "application/json" } };
             let queryUrl = ` https://api.github.com/users/${username}`
             axios.get(queryUrl, config)
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
    .then(()=>{
      let newUrl = `https://api.github.com/users/${username}/starred`
      axios.get(newUrl, config)
      .then(res=>{
        starNum = res.data.length;
      })
    });}
    )}; 



async function init() {
    try {
        
         const data = await userInput();
         const html = generateHTML(data);
       //  const html2 = await axiosCall();
         await writeFileAsync("index.html", html);
       //  await writeFileAsync("index2.html", html2);
        
    }catch (err) {
        console.log(err);
      } 
    }
    
init();

