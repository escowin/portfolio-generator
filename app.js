const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your name? (required)',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('please enter your name!');
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'enter your github username (required)',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('please enter your github username.');
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: "provide some information about yourself:"
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
`);
// if theres no 'projects' array property, create one
if (!portfolioData.projects) {
  portfolioData.projects = [];
}
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("enter the project's name.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (required)'
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('enter the GitHub link.');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
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