const fs = require('fs');
const path = require('path');
const { handleError } = require('./error');
const { importTxt } = require('./text');
const { importCsv } = require('./csv');

const exportTxt = (url, filePath) => {
    importTxt(url)
        .then(data => {
            const resolvedPath = path.resolve(filePath || `../${data.split('\n')[0].replace('/', '')}.txt`);
            write(data, resolvedPath);
        })
        .catch(error => {
            handleError(error);
        })
}

const exportCsv = (url, filePath) => {
    importCsv(url)
        .then(([title, data]) => {
            if (filePath) {
                console.log("Requested filename was not used, using board title as it is not available in the csv file");
            }
            const resolvedPath = path.resolve(`../${title.replace(/\s/g, '')}.csv`);
            write(data, resolvedPath);
        })
        .catch(error => {
            handleError(error);
        })
}

const write = (data, resolvedPath) => {
    fs.writeFile(resolvedPath, data, (error) => {
        if (error) {
            throw error;
        } else {
            console.log(`Successfully written to file at: ${resolvedPath}`);
        }
        process.exit();
    });
}

module.exports = { exportTxt, exportCsv };