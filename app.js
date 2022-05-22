const fs = require('fs');
const inquirer = require("inquirer");
const generatePage = require('./src/page-template');

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

// mock data
const mockData = {
    name: 'edwin escobar',
    github: 'escowin',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskmaster Pro',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
        link: 'https://github.com/lernantino/taskmaster-pro',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Robot Gladiators',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript'],
        link: 'https://github.com/lernantino/robot-gladiators',
        feature: false,
        confirmAddProject: false
      }
    ]
  };

const pageHTML = generatePage(mockData);

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);
    });
//   });
