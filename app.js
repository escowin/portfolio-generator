const profileDataArgs = process.argv.slice(2, process.argv.length);

// arrow functions
// one parameter | can ommit parentheses
const printProfileData = profileDataArr => {
  // print arguments one at a time
  // refactor | for() loop > .forEach() syntax
  profileDataArr.forEach(profileItem => console.log(profileItem));
};


printProfileData(profileDataArgs)