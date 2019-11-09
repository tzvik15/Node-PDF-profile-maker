const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const generateHTML = require("./generateHTML");

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
let color = "";

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your GitHub username",
        name: "username"
      },
      {
        type: "input",
        message: "Do you prefer green/red/pink/blue?",
        name: "color"
      }
    ])
    .then(function({ username, color }) {
      const config = { headers: { accept: "application/json" } };
      let queryUrl = ` https://api.github.com/users/${username}`;
      return axios.get(queryUrl, config).then(userData => {
        let newUrl = `https://api.github.com/users/${username}/starred`;

        

        axios.get(newUrl, config).then(starredRepos => {
          data = {
            img: userData.data.avatar_url,
            location: userData.data.location,
            gitProfile: userData.data.html_url,
            userBlog: userData.data.blog,
            userBio: userData.data.bio,
            repoNum: userData.data.public_repos,
            followers: userData.data.followers,
            following: userData.data.following,
            starNum:starredRepos.data.length,
            username: username,
            color: color
          };
           generateHTML(data);
           writeHTML(generateHTML(data));
         
        });
      });
    });
}

const writeHTML = function(generateHTML){
writeFileAsync("index.html", generateHTML);
}

 init();