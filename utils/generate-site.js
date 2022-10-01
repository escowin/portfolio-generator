const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // an error will reject the promise & send the error to the promise's .catch() method
            if (err) {
                reject(err);
                // returns out of the function. prevents promise from accidentally executing the resolve() function
                return;
            }

            // if all is well, the promise is resolved & it'll send the data to the .then() method
            resolve({
                ok: true,
                message: 'file created.'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'style sheet successfully copied.'
            });
        });
    });
};

module.exports = { writeFile, copyFile };