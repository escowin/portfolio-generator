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
            message: "enter your name"
        },
        {
            type: 'input',
            name: 'github',
            message: 'enter your github username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'enter info about yourself'
        }
    ]);
};

const promptProject = () => {
    console.log(`
    ===========
    add project
    ===========
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'enter project name'
        },
        {
            type: 'input',
            name: 'description',
            message: 'enter project description'
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
            message: 'enter github project link (required)'
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
    ]);
};

promptUser()
    .then(answers => console.log(answers))
    .then(promptProject)
    .then(projectAnswers => console.log(projectAnswers));