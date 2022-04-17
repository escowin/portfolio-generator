const profileDataArgs = process.argv.slice(2, process.argv.length);
const name = profileDataArgs[0];
const github = profileDataArgs[1];

const generatePage = (userName, githubName) => {
    return `
        Name: ${userName}
        GitHub: ${githubName}
    `;
};
console.log(generatePage(name, github));