const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "enter your name (required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'enter your github username (required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('enter username');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'enter info about yourself'
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    ===========
    add project
    ===========
    `);

    // if nonexistent, create projects [] propery
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'enter project name (required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter project name')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'enter project description (required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('enter description');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'what languages are used? check all that apply',
            choices: ['javascript', 'html', 'css', 'es6', 'jQuery', 'bootstrap', 'node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'enter github project link (required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('enter link');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: "feature this project?",
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'enter another project?',
            default: false
        }
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