const profileDataArgs = process.argv.slice(2, process.argv.length);
const [name, github] = profileDataArgs;

const generatePage = (userName, githubName) => {
    return `
        Name: ${userName}
        GitHub: ${githubName}
    `;
};
console.log(generatePage(name, github));