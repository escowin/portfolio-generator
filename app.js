const inquirer = require("inquirer");

// inquirer.prompt([questions]).then(answers => {use user feedback});
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "your name:",
    },
    {
      type: "input",
      name: "github",
      message: "your github:",
    },
    {
      type: "input",
      name: "about",
      message: "about you:",
    },
  ]);
};

const promptProject = (portfolioData) => {
  console.log(`
    ===========
    add project
    ===========
    `);

  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "project name:",
      },
      {
        type: "input",
        name: "description",
        message: "project description (required):",
      },
      {
        type: "checkbox",
        name: "languages",
        message: "project languages (check all that apply):",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "github repo (required):",
      },
      {
        type: "confirm",
        name: "feature",
        message: "display as feature project?",
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
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
