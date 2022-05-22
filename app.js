const fs = require('fs');
const generatepPage = require('./src/page-template');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile('index.html', generatepPage(name, github), err => {
    if (err) throw err;

    console.log('portfolio complete. check index.html for output.');
});