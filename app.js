const fs = require('fs');
const generatePage = require('./src/page-template')

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

// (file name, data being written, callback function to handle errors & success)
fs.writeFile('index.html', generatePage(name, github), err => {
  // throw stops code execution
  if (err) throw err;

  console.log('portfolio complete. check out inde.html to see output.');
});