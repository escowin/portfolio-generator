const fs = require('fs');
const inquirer = require("inquirer");
const generatePage = require('./src/page-template');

// inquirer.prompt([questions]).then(answers => {use user feedback});
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "your name (required):",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("enter your name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "your github (required):",
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log("enter github username");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: "add an 'about' section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "about you:",
      when: ({ confirmAbout }) => confirmAbout
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
        message: "project name (required):",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log("enter project name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "project description (required):",
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log("enter project description");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "project languages (check all that apply):",
        choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node", "React"],
      },
      {
        type: "input",
        name: "link",
        message: "github repo (required):",
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log("enter github link");
            return false;
          }
        },
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
  .then((portfolioData) => {
    console.log(portfolioData);
    // const pageHTML = generatePage(name, github);
    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw err;
    //   console.log('Portfolio complete! Check out index.html to see the output!');
    // });
  });



