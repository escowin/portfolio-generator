const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name, github] = profileDataArgs;

// writes file with content inside. handles errs & successes
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('portfolio complete. check out index.html to see output');
});