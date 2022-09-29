const inquirer = require("inquirer");
// const fs = require('fs');
// const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "enter name",
    },
    {
      type: "input",
      name: "github",
      message: "enter github username",
    },
    {
      type: "input",
      name: "about",
      message: "describe yourself",
    },
  ]);
};

const promptProject = portfolioData => {
  // initializes array only on first pass
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  ================
  adding a project
  ================
  `);
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "enter project name",
    },
    {
      type: "input",
      name: "description",
      message: "enter project description (required)",
    },
    {
      type: "checkbox",
      name: "languages",
      message: "select languages used to build project",
      choices: [
        "HTML",
        "CSS",
        "Javascript",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node",
      ],
    },
    {
      type: "input",
      name: "link",
      message: "enter github repo link (required)",
    },
    {
      type: "confirm",
      name: "feature",
      message: "highlight project?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "add another project?",
      default: false,
    },
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);

    // if user wants to add another project, callback w/ portfolio data. if not, explicity return data object.
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => console.log(portfolioData));

// const pageHTML = generatePage(name, github);

// (file name, data being written, callback function to handle errors & success)
// fs.writeFile('index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('portfolio complete. check out inde.html to see output.');
// });
