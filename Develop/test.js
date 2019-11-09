
const api = require("./api");
const github = "tzvik15"; // add your github username here
api.getUser(github).then(response => console.log(response.data));