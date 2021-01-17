const fs = require('fs');
const path = require('path');
const { handleError } = require('./error.js');
const { importTxt } = require('./text.js')
const { importCsv } = require('./csv.js')

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
            console.log("Requested filename was not used, used board title as it is not available in the csv file")
            const resolvedPath = path.resolve(`../${title.replace(/\s/g, '')}.txt`);
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
        process.exit()
    });
}

exports.exportTxt = exportTxt;
exports.exportCsv = exportCsv;