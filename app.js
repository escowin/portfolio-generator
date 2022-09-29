const inquirer = require("inquirer");
// const fs = require('fs');
// const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "enter name (required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("entering a name is required");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "enter github username",
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log("your github username is required");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'add an "about me" section?',
      default: true
    },
    {
      type: "input",
      name: "about",
      message: "describe yourself",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
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
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("project name is required");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "description",
      message: "enter project description (required)",
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log("a description is required");
          return false;
        }
      }
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
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log("a repo link is required");
          return false;
        }
      }
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
