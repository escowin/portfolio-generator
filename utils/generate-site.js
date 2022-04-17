const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if error | reject promise, send error to .catch()
            if (err) {
                reject(err);
                // return out of function here to make sure Promise doesn't execute resolve() as well
                return;
            }

            // if ok | resolve Promise, send successful data to .then()
            resolve({
                ok: true,
                message: 'file created'
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
                message: 'stylesheet copied'
            });
        });
    });
};

module.exports = { writeFile, copyFile };