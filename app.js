const inquirer = require("inquirer");
// const fs = require('fs');
// const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what is your name?",
    }
  ]);
};

promptUser().then(answers => console.log(answers));

// const pageHTML = generatePage(name, github);

// (file name, data being written, callback function to handle errors & success)
// fs.writeFile('index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('portfolio complete. check out inde.html to see output.');
// });
