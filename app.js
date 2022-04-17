const generatePage = (userName, githubName) => {
    return `
        Name: ${userName}
        GitHub: ${githubName}
    `;
};
console.log(generatePage('Edwin', 'escowin'));